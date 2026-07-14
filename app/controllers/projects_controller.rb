class ProjectsController < ApplicationController
    load_and_authorize_resource
    before_action :authenticate_user!



    def index
        @projects = Project.all
    end



    def new
    end
    def create
        @project = Project.new(project_params)
        @project.user = current_user
        if @project.save
            redirect_to projects_path, notice: "Project created successfully."
        else
            render :new
        end
    end




    private
    def project_params
        params.require(:project).permit(:name, :description)
    end

end
