import "@hotwired/turbo-rails"

import React from "react"
import { createRoot } from "react-dom/client"

import BugsIndexPage from "./components/bugs/BugsIndexPage"
import BugForm from "./components/bugs/BugForm"
import BugShowPage from "./components/bugs/BugShowPage"
import ProjectForm from "./components/projects/ProjectForm"
import ProjectShowPage from "./components/projects/ProjectShowPage"
import ProjectsIndexPage from "./components/projects/ProjectsIndexPage"

const componentMap = {
    BugsIndexPage,
    BugForm,
    BugShowPage,
    ProjectForm,
    ProjectShowPage,
    ProjectsIndexPage,
}

const mountReactComponents = () => {
    document.querySelectorAll("[data-react-class]").forEach((element) => {
        const componentName = element.dataset.reactClass
        const Component = componentMap[componentName]

        if (!Component) return

        let props = {}
        try {
            props = element.dataset.reactProps ? JSON.parse(element.dataset.reactProps) : {}
        } catch (error) {
            console.error(`Invalid React props for ${componentName}:`, element.dataset.reactProps, error)
        }

        createRoot(element).render(React.createElement(Component, props))
    })
}

if (window.Turbo) {
    document.addEventListener("turbo:load", mountReactComponents)
} else {
    document.addEventListener("DOMContentLoaded", mountReactComponents)
}

mountReactComponents()
