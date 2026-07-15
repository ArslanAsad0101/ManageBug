class ProjectsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    @projects = Project.all
  end


  def new
    # @qas = User.qa
    # @developers = User.developer
  end


  def create
  @project = current_user.projects.build(project_params)

  if @project.save
    redirect_to projects_path, notice: "Project created successfully."
  else
    render :new, status: :unprocessable_entity
  end
end



  private


  def project_params
    params.require(:project).permit(:name, :description)
  end



  # def assign_users

  #   user_ids = params[:project][:user_ids]

  #   user_ids.each do |user_id|

  #     @project.assigned_qa_developers.create(
  #       user_id: user_id
  #     )

  #   end

  # end

end