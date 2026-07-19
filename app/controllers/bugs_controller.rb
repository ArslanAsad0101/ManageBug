class BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_form_data, only: [:new, :create]
  before_action :set_project, except: [:index, :new, :create]
  before_action :set_bug, only: [:show, :edit, :update, :destroy]

  def index
    @bugs = Bug.accessible_by(current_ability)
  end

  def new
    authorize! :create, Bug
    @bug = Bug.new
  end

  def create
    authorize! :create, Bug

    @project = current_user.assigned_projects.find_by(id: bug_params[:project_id])

    unless @project
      @bug = Bug.new(bug_params)
      @bug.errors.add(:project_id, "must be selected")
      render :new, status: :unprocessable_entity
      return
    end

    @bug = @project.bugs.build(bug_params)
    @bug.reporter = current_user

    if @bug.save
      redirect_to [@project, @bug], notice: "Bug was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
    authorize! :update, @bug

    # @developers = User.developer
    @is_developer = current_user.developer?
  end

  def update

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
    @bug.destroy
    redirect_to [@project, @bug], notice: "Bug deleted successfully."
  end

  private

  def load_form_data
    @projects = current_user.assigned_projects
    @developers = User.developer
  end

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_bug
    @bug = @project.bugs.find(params[:id])
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