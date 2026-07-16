class BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, except: [:index, :new]
  before_action :set_bug, only: [:show, :edit, :update, :destroy]

  def index
    @bugs =
      if current_user.qa?
        current_user.reported_bugs
      elsif current_user.developer?
        current_user.assigned_bugs
      elsif current_user.manager?
        Bug.joins(:project).where(projects: { manager_id: current_user.id })
      else
        Bug.none
      end
  end

  def new
    authorize! :create, Bug
    @bug = Bug.new
    @developers = User.developer
    @projects = current_user.assigned_projects
  end

   def create
    authorize! :create, Bug
    @project = Project.find(params[:project_id])
    @bug = @project.bugs.build(bug_params)
    @bug.reporter = current_user
    @developers = User.developer

    if @bug.save
      redirect_to project_bug_path(@project, @bug),
                  notice: "Bug created successfully."
    else
      @projects = current_user.assigned_projects
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
  end

  def update
    if @bug.update(bug_params)
      redirect_to project_bug_path(@project, @bug), notice: "Bug updated successfully."
    else
      @developers = User.developer
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @bug.destroy
    redirect_to bugs_path, notice: "Bug deleted successfully."
  end

 

  private

  def set_project
    @project = Project.find(params[:project_id]) if params[:project_id].present?
  end

  def set_bug
    @bug = @project.bugs.find(params[:id])
  end

  def bug_params
    params.require(:bug).permit(
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