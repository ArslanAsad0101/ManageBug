import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="multi-select"
export default class extends Controller {
  static targets = ["checkbox", "preview"]

  connect() {
    this.update()
  }

  update() {
    const selected = this.checkboxTargets
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.dataset.previewLabel)
      .filter(Boolean)

    this.previewTarget.textContent =
      selected.length > 0 ? selected.join(", ") : "None selected"
  }
}
