// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("turbo:load", () => {
  document.querySelectorAll(".selection-checkbox").forEach((checkbox) => {
    const preview = document.querySelector(`.selection-preview[data-preview-role="${checkbox.dataset.previewRole}"] .selection-preview-values`);

    const updatePreview = () => {
      if (!preview) return;

      const selectedValues = Array.from(document.querySelectorAll(`.selection-checkbox[data-preview-role="${checkbox.dataset.previewRole}"]`))
        .filter((item) => item.checked)
        .map((item) => item.dataset.previewLabel)
        .filter(Boolean);

      preview.textContent = selectedValues.length > 0 ? selectedValues.join(", ") : "None selected";
    };

    checkbox.addEventListener("change", updatePreview);
    updatePreview();
  });
});
