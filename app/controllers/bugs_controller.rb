class BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, except: [:index, :new]
  before_action :set_bug, only: [:show, :update, :destroy, :edit]

  def index
    @bugs = Bug.accessible_by(current_ability)
  end

  def new
    # authorize! :create, Bug
    @bug = Bug.new
    @projects = current_user.assigned_projects
@developers = User.developer
  end

   def create
    # authorize! :create, Bug
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
  authorize! :update, @bug
  @developers = User.developer
  @is_developer = current_user.developer?
end

def update
  # authorize! :update, @bug
  
  if @bug.update(bug_params)
    redirect_to project_bug_path(@project, @bug), notice: "Bug updated successfully."
  else
    @developers = User.developer
    @is_developer = current_user.developer?
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
  if current_user.developer?
    # Developers can ONLY update status
    params.require(:bug).permit(:status)
  else
    # QA can update all fields
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
end