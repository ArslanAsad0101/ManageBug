class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_data, only: [:new, :create, :edit, :update]
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  # load_and_authorize_resource

def index
  @projects = Project.accessible_by(current_ability)

  if params[:search].present?
    @projects = @projects.where("name LIKE ?", "%#{params[:search]}%")
  end
end



def new
  authorize! :create, Project
  @project = Project.new
end

 def create
  @project = current_user.projects.build(project_params)
  @selected_qa_user_ids = params.dig(:project, :qa_user_ids) 
  @selected_developer_user_ids = params.dig(:project, :developer_user_ids)
  @selected_qa_names = @qas.where(id: @selected_qa_user_ids).pluck(:name)
  @selected_developer_names = @developers.where(id: @selected_developer_user_ids).pluck(:name)

  if @selected_qa_user_ids.blank? && @selected_developer_user_ids.blank?
    @project.errors.add(:base, "At least one QA or Developer must be selected.")
    render :new, status: :unprocessable_entity
    return
  end

  if @project.save
    user_ids = @selected_qa_user_ids + @selected_developer_user_ids

    user_ids.each do |user_id|
      @project.project_users.create(user_id: user_id)
    end

    redirect_to projects_path, notice: "Project created successfully."
  else
    render :new, status: :unprocessable_entity, alert: "Please fix the errors below."
  end
end


def show
  # @project = Project.find(params[:id])
end



def edit
  authorize! :update, @project
  # @qas = User.qa
  # @developers = User.developer
end
def update
  @selected_qa_user_ids = params.dig(:project, :qa_user_ids)
  @selected_developer_user_ids = params.dig(:project, :developer_user_ids)
  @selected_qa_names = @qas.where(id: @selected_qa_user_ids).pluck(:name)
@selected_developer_names = @developers.where(id: @selected_developer_user_ids).pluck(:name)

  if @selected_qa_user_ids.blank? && @selected_developer_user_ids.blank?
    @project.errors.add(:base, "At least one QA or Developer must be selected.")
    render :edit, status: :unprocessable_entity
    return
  end

  if @project.update(project_params)
    user_ids = @selected_qa_user_ids + @selected_developer_user_ids

    @project.project_users.destroy_all
    user_ids.each do |user_id|
      @project.project_users.create(user_id: user_id)
    end

    redirect_to @project, notice: "Project updated successfully."
  else
    render :edit, status: :unprocessable_entity
  end
end


def destroy
  authorize! :destroy, @project
  @project.destroy
  redirect_to projects_path, notice: "Project deleted successfully."
end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
  params.require(:project).permit(:name, :description, :image)
end

def load_data
  @qas = User.qa
  @developers = User.developer 
end

# def validate_step_one_details!
#     @project.errors.add(:qa_user_id, "must be selected") if @project.qa_user_id.blank?
# end
end