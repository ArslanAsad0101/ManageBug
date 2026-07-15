class Ability
  include CanCan::Ability


  def initialize(user)
    return unless user


    if user.manager?
      can :manage, Project
    elsif user.qa? || user.developer?
      can :read, Project
    end

  end

end