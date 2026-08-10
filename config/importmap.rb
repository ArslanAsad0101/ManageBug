# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "@hotwired/turbo-rails.js", preload: true
pin "@hotwired/stimulus", to: "@hotwired/stimulus.js", preload: true
pin "@hotwired/stimulus-loading", to: "@hotwired/stimulus-loading.js", preload: true
pin "react", to: "https://ga.jspm.io/npm:react@19.2.8/index.js"
pin "react-dom", to: "https://ga.jspm.io/npm:react-dom@19.2.8/index.js"
pin "react-dom/client", to: "https://ga.jspm.io/npm:react-dom@19.2.8/client.js"
pin_all_from "app/javascript/controllers", under: "controllers"
