class BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_data, only: [:new, :create, :edit, :update]
  before_action :set_project, except: [:index, :new, :create]
  before_action :set_bug, only: [:show, :edit, :update, :destroy]

  def index
    @bugs = Bug.accessible_by(current_ability)
    @view = params[:view] || "list"

    if params[:search].present?
      @bugs = @bugs.where("title LIKE ?", "%#{params[:search]}%")
    end
  end

  def new
    authorize! :create, Bug
    @bug = Bug.new(bug_form_params)
    @step = params[:step] == "select_developer" ? "select_developer" : "details"
  end


  def create
    authorize! :create, Bug

    @project = current_user.assigned_projects.find_by(id: bug_params[:project_id])

    unless @project
      @bug = Bug.new(bug_form_params)
      @bug.errors.add(:project_id, "must be selected")
      render :new, status: :unprocessable_entity
      return
    end

    @bug = @project.bugs.build(bug_form_params)
    @bug.reporter = current_user

    if @bug.save
      redirect_to [@project, @bug], notice: "Bug was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    authorize! :read, @bug
  end

  def edit
    authorize! :update, @bug

    # @developers = User.developer
    @is_developer = current_user.developer?
  end

  def update
    authorize! :update, @bug

    if @bug.update(bug_params)
      redirect_to [@project, @bug], notice: "Bug updated successfully."
    else
      # @developers = User.developer
      @is_developer = current_user.developer?
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize! :destroy, @bug

    if @bug.destroy
      redirect_to project_path(@project), notice: "Bug deleted successfully."
    else
      redirect_to project_bug_path(@project, @bug), alert: "Unable to delete this bug."
    end
  end

  private

  def load_data
    @projects = current_user.assigned_projects

    selected_project_id = params.dig(:bug, :project_id) || params[:project_id]

    @developers = if selected_project_id.present?
                   Project.find_by(id: selected_project_id)&.assigned_users&.developer
                 else
                   []
                 end
  end

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_bug
    @bug = @project.bugs.find(params[:id])
  end

  def bug_form_params
    return {} unless params[:bug].present?

    params.require(:bug).permit(:project_id, :title, :description, :deadline, :bug_type, :status, :developer_id, :screenshot)
  end

  def bug_params
    if current_user.developer?
      params.require(:bug).permit(:status)
    else
      params.require(:bug).permit(
        :project_id,
        :title,
        :description,
        :deadline,
        :bug_type,
        :status,
        :developer_id,
        :screenshot
      )
    end
  end
end