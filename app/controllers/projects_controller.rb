class ProjectsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
if params[:search].present?
    @projects = Project.where("name LIKE ?", "%#{params[:search]}%")
  else
    @projects = Project.all
  end
  end



def new
  @qas = User.qa
  @developers = User.developer
end

  def create
  @project = current_user.projects.build(project_params)

  if @project.save
    user_ids = (params[:project][:qa_user_ids] || []) + (params[:project][:developer_user_ids] || [])

    user_ids.each do |user_id|
      @project.project_users.create(user_id: user_id)
    end

    redirect_to projects_path, notice: "Project created successfully."
  else
    render :new
  end
end



def show
  @project = Project.find(params[:id])
end



def edit
  @qas = User.qa
  @developers = User.developer
end
def update
  if @project.update(project_params)
    redirect_to project_path(@project), notice: "Project updated successfully."
  else
    render :edit
  end 
end
  private

  def project_params
  params.require(:project).permit(:name, :description, :image)
end

  
end