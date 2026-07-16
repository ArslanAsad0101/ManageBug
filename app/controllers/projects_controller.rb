class ProjectsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    @projects = Project.all
  end



def new
  @qas = User.where(role: :qa)
  @developers = User.where(role: :developer)
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
  private

  def project_params
  params.require(:project).permit(:name, :description, :image)
end

  
end