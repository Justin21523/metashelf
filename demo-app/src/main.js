import "./styles.css";

const project = {
  "slug": "metashelf",
  "title": "MetaShelf — Bibliographic Resource Discovery Platform",
  "summary": "MetaShelf is a resource discovery platform that blends Library and Information Science (LIS) principles with a modern e-commerce browsing experience. The backend is built on FastAPI with async SQLAlchemy following Clean Architecture (Models/Schemas/Repositories/Services/API); the frontend is a React 19 + Vite + Tailwind card-based catalog. The data model uses FRBR-lite, separating Resource (bibliographic record) from Item (physical holding), with professional metadata like ISBN, call number, and subject headings. Currently an MVP.",
  "category": "information-system",
  "year": 2026,
  "status": "in-progress",
  "technologies": [
    "Python",
    "FastAPI",
    "SQLAlchemy 2.0 (Async)",
    "Pydantic v2",
    "SQLite",
    "aiosqlite",
    "Alembic",
    "Uvicorn",
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS v4",
    "TanStack Query",
    "Axios",
    "Zustand"
  ],
  "githubUrl": "https://github.com/Justin21523/metashelf",
  "readmeUrl": "https://github.com/Justin21523/metashelf#readme",
  "problem": "Traditional library catalog systems have dated interfaces and poor search UX, while consumer reading-list tools lack the rigorous metadata of library science (FRBR levels, call numbers, subject headings, authority control). The core challenge is reconciling LIS rigor with a smooth, e-commerce-grade discovery experience.",
  "solution": "The backend pairs FastAPI with async SQLAlchemy 2.0, splitting into five Clean Architecture layers (Domain/DTO/Repository/Service/API) for testability and maintainability. The data layer uses FRBR-lite, separating the bibliographic Resource from the physical Item while preserving professional fields like ISBN, call number, and subject headings. The frontend is a responsive card-based catalog built with React 19 + Vite + Tailwind v4, consuming the REST API via TanStack Query with dark mode and lazy-loaded covers.",
  "architecture": "This case study is generated from the portfolio catalog pipeline using README, Git metadata, package/build configuration, and media signals. The final architecture narrative still needs source-level review. Current detected technology signals include: Python, FastAPI, SQLAlchemy 2.0 (Async), Pydantic v2, SQLite, aiosqlite, Alembic, Uvicorn, React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Axios, Zustand.",
  "setupGuide": "This project does not expose a verified runnable web command yet. Review the README/source tree and add exact install, run, test, and build commands before interview use.\nNo verified build command was detected. Treat the current portfolio page as a case-study placeholder until build steps are reviewed.",
  "features": [
    "Detected technical signals: Python, FastAPI, SQLAlchemy 2",
    "0 (Async), Pydantic v2, SQLite, aiosqlite, Alembic, Uvicorn, React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Axios, Zustand,README evidence exists and can support a fuller reviewed case study,A public GitHub repository is not verified yet",
    "the portfolio marks it as pending",
    "The backend pairs FastAPI with async SQLAlchemy 2",
    "0, splitting into five Clean Architecture layers (Domain/DTO/Repository/Service/API) for testability and maintainability",
    "The data layer uses FRBR-lite, separating the bibliographic Resource from the physical Item while preserving professional fields like ISBN, call number, and subject headings"
  ],
  "metrics": [
    {
      "label": "Demo Modules",
      "value": "6"
    },
    {
      "label": "Tech Stack",
      "value": "15"
    },
    {
      "label": "Mode",
      "value": "Fixture"
    },
    {
      "label": "Status",
      "value": "in-progress"
    }
  ],
  "records": [
    {
      "id": "flow-01",
      "name": "Detected technical signals: Python, FastAPI, SQLAlchemy 2",
      "status": "Ready",
      "owner": "Frontend"
    },
    {
      "id": "flow-02",
      "name": "0 (Async), Pydantic v2, SQLite, aiosqlite, Alembic, Uvicorn, React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Axios, Zustand,README evidence exists and can support a fuller reviewed case study,A public GitHub repository is not verified yet",
      "status": "Review",
      "owner": "Data"
    },
    {
      "id": "flow-03",
      "name": "the portfolio marks it as pending",
      "status": "Queued",
      "owner": "Automation"
    },
    {
      "id": "flow-04",
      "name": "The backend pairs FastAPI with async SQLAlchemy 2",
      "status": "Ready",
      "owner": "Product"
    },
    {
      "id": "flow-05",
      "name": "0, splitting into five Clean Architecture layers (Domain/DTO/Repository/Service/API) for testability and maintainability",
      "status": "Review",
      "owner": "Quality"
    }
  ]
};

const state = {
  tab: "overview",
  query: "",
  selected: project.records[0]?.id ?? "",
};

function matches(record) {
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  return [record.name, record.status, record.owner].join(" ").toLowerCase().includes(q);
}

function renderMetrics() {
  return project.metrics.map((metric) => `
    <div class="metric">
      <span>${metric.label}</span>
      <strong>${metric.value}</strong>
    </div>
  `).join("");
}

function renderTabs() {
  return ["overview", "workflow", "data", "architecture"].map((tab) => `
    <button class="tab ${state.tab === tab ? "active" : ""}" data-tab="${tab}">${tab}</button>
  `).join("");
}

function renderOverview() {
  return `
    <section class="panel hero-panel">
      <div>
        <p class="eyebrow">${project.category} · ${project.year}</p>
        <h1>${project.title}</h1>
        <p class="lead">${project.summary}</p>
      </div>
      <div class="metrics">${renderMetrics()}</div>
    </section>
    <section class="panel split">
      <div>
        <h2>Problem</h2>
        <p>${project.problem}</p>
      </div>
      <div>
        <h2>Solution</h2>
        <p>${project.solution}</p>
      </div>
    </section>
  `;
}

function renderWorkflow() {
  return `
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Demo workflow</p>
          <h2>Interactive Review Flow</h2>
        </div>
        <button id="runDemo" class="primary">Run demo pass</button>
      </div>
      <div class="timeline">
        ${project.features.map((feature, index) => `
          <article class="step">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${feature}</p>
          </article>
        `).join("")}
      </div>
      <output id="demoOutput" class="output">Ready to run the guided demo.</output>
    </section>
  `;
}

function renderData() {
  const rows = project.records.filter(matches);
  return `
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Fixture data</p>
          <h2>Sample Records</h2>
        </div>
        <input id="search" value="${state.query}" placeholder="Filter records" />
      </div>
      <div class="table">
        ${rows.map((record) => `
          <button class="row ${state.selected === record.id ? "selected" : ""}" data-record="${record.id}">
            <span>${record.id}</span>
            <strong>${record.name}</strong>
            <em>${record.owner}</em>
            <b>${record.status}</b>
          </button>
        `).join("") || `<p class="empty">No records match this filter.</p>`}
      </div>
    </section>
  `;
}

function renderArchitecture() {
  return `
    <section class="panel split">
      <div>
        <p class="eyebrow">Architecture</p>
        <h2>How the demo is organized</h2>
        <p>${project.architecture}</p>
        <pre>demo-app/
  src/main.js
  src/styles.css
  index.html
  package.json</pre>
      </div>
      <div>
        <p class="eyebrow">Run guide</p>
        <h2>Local commands</h2>
        <pre>${project.setupGuide}</pre>
        <div class="chips">${project.technologies.slice(0, 12).map((tech) => `<span>${tech}</span>`).join("")}</div>
      </div>
    </section>
  `;
}

function render() {
  const views = {
    overview: renderOverview,
    workflow: renderWorkflow,
    data: renderData,
    architecture: renderArchitecture,
  };
  document.querySelector("#app").innerHTML = `
    <header class="topbar">
      <a href="${project.githubUrl}" class="brand">${project.title}</a>
      <nav>${renderTabs()}</nav>
      <a class="repo" href="${project.readmeUrl}">README</a>
    </header>
    <main>${views[state.tab]()}</main>
  `;

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      render();
    });
  });
  document.querySelector("#search")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
    document.querySelector("#search")?.focus();
  });
  document.querySelectorAll("[data-record]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selected = button.dataset.record;
      render();
    });
  });
  document.querySelector("#runDemo")?.addEventListener("click", () => {
    const output = document.querySelector("#demoOutput");
    if (output) output.textContent = `${project.title}: ${project.records.length} fixture records processed and ${project.features.length} workflow checks completed.`;
  });
}

render();
