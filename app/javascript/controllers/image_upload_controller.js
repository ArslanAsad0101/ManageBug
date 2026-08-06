import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="image-upload"
export default class extends Controller {
  static targets = [
    "input",
    "preview",
    "placeholder",
    "dataUrlField",
    "nameField"
  ]

  change() {
    const file = this.inputTarget.files?.[0]

    if (!file || !file.type.startsWith("image/")) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const dataUrl = event.target.result

      this.dataUrlFieldTarget.value = dataUrl
      this.nameFieldTarget.value = file.name

      this.show(dataUrl, file.name)
    }

    reader.readAsDataURL(file)
  }

  show(dataUrl, fileName) {
    this.previewTarget.src = dataUrl
    this.previewTarget.alt = fileName || "Project logo"
    this.previewTarget.hidden = false

    this.placeholderTarget.hidden = true

    // Remove border after upload
    this.element.classList.add("has-image")

    this.element.title = fileName || "Uploaded image"
  }
}