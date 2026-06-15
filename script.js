(function () {
  const content = window.siteContent;

  const toHTML = (text) =>
    (text || "").split(/\n\n+/).map((p) => `<p>${p}</p>`).join("");

  // Populate data-content nodes
  document.querySelectorAll("[data-content]").forEach((node) => {
    const key = node.dataset.content;
    if (content[key]) node.textContent = content[key];
  });

  // Populate data-image nodes
  document.querySelectorAll("[data-image]").forEach((node) => {
    const key = node.dataset.image;
    if (content.images[key]) {
      node.src = content.images[key];
      node.alt = content.brand;
    }
  });

  // Update mailto links
  document.querySelectorAll('a[href^="mailto:"]').forEach((node) => {
    node.href = `mailto:${content.email}`;
  });

  // Socials — block list (footer, legacy)
  const socialNode = document.querySelector("[data-socials]");
  if (socialNode) {
    socialNode.innerHTML = content.socials
      .map((s) => `<a href="${s.href}" target="_blank" rel="noreferrer">${s.label}</a>`)
      .join("");
  }

  // Socials — footer circle icons
  const iconMap = {
    LinkedIn: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    X: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    Behance: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.477.602.406.271.718.633.937 1.086.217.453.328 1.008.328 1.662 0 .7-.163 1.29-.49 1.766-.327.476-.8.87-1.415 1.18.854.254 1.489.69 1.907 1.307.418.617.625 1.365.625 2.245 0 .717-.133 1.338-.4 1.864-.267.525-.632.959-1.096 1.302-.462.342-1.003.598-1.62.767-.616.169-1.26.254-1.932.254H.5V4.503h6.438zm-.34 5.65c.564 0 1.024-.135 1.378-.403.352-.27.528-.694.528-1.273 0-.32-.058-.587-.176-.8a1.43 1.43 0 0 0-.47-.516 1.97 1.97 0 0 0-.683-.286 3.644 3.644 0 0 0-.83-.092H2.988v3.37h3.61zm.188 5.886c.317 0 .617-.033.9-.1.284-.066.535-.174.752-.323.217-.149.39-.347.517-.594.127-.247.19-.553.19-.917 0-.73-.203-1.265-.61-1.606-.406-.342-.962-.513-1.667-.513H2.988v4.053h3.798zM15.924 14.86c.418.412 1.02.617 1.808.617.563 0 1.048-.14 1.454-.42.406-.282.655-.578.748-.889h2.405c-.385 1.21-.978 2.078-1.778 2.604-.8.525-1.767.787-2.9.787-.786 0-1.496-.126-2.13-.378a4.536 4.536 0 0 1-1.615-1.066 4.747 4.747 0 0 1-1.02-1.653c-.238-.636-.357-1.337-.357-2.104 0-.74.123-1.429.37-2.067a4.834 4.834 0 0 1 1.043-1.645 4.81 4.81 0 0 1 1.62-1.087c.633-.262 1.33-.393 2.09-.393.855 0 1.602.163 2.24.489a4.46 4.46 0 0 1 1.567 1.32c.406.553.696 1.184.87 1.893.174.71.232 1.452.176 2.226h-7.07c.044.878.33 1.513.748 1.965zm3.158-5.38c-.336-.37-.853-.555-1.55-.555-.44 0-.808.074-1.104.222a2.24 2.24 0 0 0-.713.566 2.1 2.1 0 0 0-.38.726c-.073.26-.115.507-.126.74h4.735c-.12-.79-.425-1.33-.862-1.7zM14.5 6h7v1.5h-7V6z"/></svg>`
  };
  const footerSocialsNode = document.querySelector("[data-footer-socials]");
  if (footerSocialsNode) {
    footerSocialsNode.innerHTML = content.socials
      .map((s) => `<a class="footer-icon" href="${s.href}" target="_blank" rel="noreferrer">${iconMap[s.label] || s.label}</a>`)
      .join("") + `<a class="footer-icon" href="#" target="_blank">CV</a>`;
  }

  // Socials — inline (about page)
  const socialInline = document.querySelector("[data-socials-inline]");
  if (socialInline) {
    socialInline.innerHTML = content.socials
      .map((s) => `<a href="${s.href}" target="_blank" rel="noreferrer">${s.label}</a>`)
      .join("");
  }

  // Client marquee
  const clientTrack = document.querySelector("[data-clients]");
  if (clientTrack) {
    const doubled = [...content.clients, ...content.clients];
    clientTrack.innerHTML = doubled
      .map((client) => {
        const img = `<img class="client-logo ${client.className || ""}" src="${client.logo}" alt="${client.label}">`;
        return `<span class="client-name">${img}</span>`;
      })
      .join("");
  }

  // Project grid (homepage)
  const projectGrid = document.querySelector("[data-projects]");
  if (projectGrid) {
    projectGrid.innerHTML = content.projects
      .map((project) => {
        const href = `/${project.slug}/`;
        const wide = project.layout === "wide" ? " project-card--wide" : "";
        const arrow = project.comingSoon ? "" : " ↗";
        if (project.comingSoon) {
          return `
          <div class="project-card${wide} project-card--coming-soon" aria-label="${project.title}">
            <figure>
              <img src="${project.image}" alt="${project.title}">
              <figcaption>
                <strong>${project.title}</strong>
                <span>${project.meta}</span>
              </figcaption>
            </figure>
          </div>`;
        }
        return `
          <a class="project-card${wide}" href="${href}" aria-label="${project.title}">
            <figure>
              <img src="${project.image}" alt="${project.title}">
              <figcaption>
                <strong>${project.title}</strong>
                <span>${project.meta}${arrow}</span>
              </figcaption>
            </figure>
          </a>`;
      })
      .join("");
  }

  // Project detail page
  const projectDetail = document.querySelector("[data-project-detail]");
  if (projectDetail) {
    const params = new URLSearchParams(window.location.search);
    const pathSlug = window.location.pathname.replace(/\/+$/, '').split('/').pop();
    const slug = params.get("project") || (content.projects.find((p) => p.slug === pathSlug) ? pathSlug : null) || content.projects[0].slug;
    const project = content.projects.find((p) => p.slug === slug) || content.projects[0];
    const related = project.relatedProjects
      ? project.relatedProjects.map((slug) => content.projects.find((p) => p.slug === slug)).filter(Boolean)
      : content.projects.filter((p) => p.slug !== project.slug).slice(0, 2);

    document.title = `${project.title} | ${content.brand}`;

    projectDetail.innerHTML = `
      <section class="detail-credits detail-credits--top detail-reveal">
        <div>
          <p>Services</p>
          <ul>${project.services.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        ${project.industry ? `<div>
          <p>Industry</p>
          <ul>${project.industry.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>` : ""}
        <div>
          <p>Role</p>
          <ul>${(project.role || ["Creative direction", "Product design", "Brand system"]).map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div>
          <p>Year</p>
          <ul><li>${project.year || "2026"}</li></ul>
        </div>
      </section>

      <section class="detail-cover">
        <img src="${project.detailCoverImage || project.image}" alt="${project.title}">
      </section>

      <section class="detail-text detail-text--intro detail-reveal">
        <article>
          <h2>${project.headline}</h2>
          <div class="detail-overview">${toHTML(project.overview)}</div>
        </article>
      </section>

      ${project.introVideo ? `
      <section class="detail-intro-video detail-reveal">
        <video src="${project.introVideo}" autoplay controls playsinline></video>
        ${project.introVideoLink ? `<a class="detail-intro-video-link" href="${project.introVideoLink.href}" target="_blank" rel="noreferrer">${project.introVideoLink.label} ↗</a>` : ""}
      </section>` : ""}

      ${project.topFullscreenImage ? `
      <section class="${project.fullscreenImagesWide ? "detail-fullscreen detail-fullscreen--wide detail-reveal" : "detail-fullscreen detail-reveal"}">
        <img src="${project.topFullscreenImage}" alt="${project.title}">
      </section>` : ""}
      ${project.gallery && project.gallery.length ? `
      <section class="detail-media-row detail-reveal">
        ${project.gallery.slice(0, 2).map((img) => `
          <figure class="detail-media">
            <img src="${img}" alt="${project.title}">
          </figure>`).join("")}
      </section>` : (!project.topFullscreenImage ? `
      <section class="detail-media-row detail-reveal"></section>` : "")}

      ${project.challengeTitle || project.challengeCopy ? `
      <section class="detail-challenge detail-reveal">
        <figure class="detail-media detail-challenge-media">
          <img src="${project.challengeImage || project.gallery[0] || project.image}" alt="${project.title} challenge">
        </figure>
        <article class="detail-challenge-copy">
          ${project.challengeTitle ? `<h2>${project.challengeTitle}</h2>` : ""}
          ${toHTML(project.challengeCopy || "")}
        </article>
      </section>` : ""}

      ${project.challenge2Title || project.challenge2Copy ? `
      <section class="detail-challenge detail-reveal">
        <figure class="detail-media detail-challenge-media">
          ${project.challenge2Video
            ? `<div class="detail-media-phone"><video src="${project.challenge2Video}" autoplay loop muted playsinline></video></div>`
            : `<img src="${project.challenge2Image || project.gallery[0] || project.image}" alt="${project.title}">`}
        </figure>
        <article class="detail-challenge-copy">
          ${project.challenge2Title ? `<h2>${project.challenge2Title}</h2>` : ""}
          ${toHTML(project.challenge2Copy || "")}
        </article>
      </section>` : ""}

      ${project.fullscreenImage ? `
      <section class="${project.fullscreenImagesWide ? "detail-fullscreen detail-fullscreen--wide detail-reveal" : "detail-fullscreen detail-reveal"}${project.fullscreenImageSquare ? " detail-fullscreen--square" : ""}">
        ${project.fullscreenLabel ? `<span class="detail-fullscreen-label">${project.fullscreenLabel}</span>` : ""}
        <img src="${project.fullscreenImage}" alt="${project.title}">
      </section>` : ""}

      ${project.beforeFSTitle || project.beforeFSCopy ? `
      <section class="detail-challenge ${project.beforeFSReverse ? "detail-challenge--reverse" : ""} detail-reveal">
        <figure class="detail-media detail-challenge-media">
          <img src="${project.beforeFSImage || project.gallery[0] || project.image}" alt="${project.title}">
        </figure>
        <article class="detail-challenge-copy">
          ${project.beforeFSTitle ? `<h2>${project.beforeFSTitle}</h2>` : ""}
          ${toHTML(project.beforeFSCopy || "")}
        </article>
      </section>` : ""}

      ${project.fullscreenImage2 ? `
      <section class="${project.fullscreenImagesWide ? "detail-fullscreen detail-fullscreen--wide detail-reveal" : "detail-fullscreen detail-reveal"}">
        <img src="${project.fullscreenImage2}" alt="${project.title}">
      </section>` : ""}

      ${project.challenge3Title || project.challenge3Copy ? `
      <section class="detail-challenge ${project.challenge3Reverse === false ? "" : "detail-challenge--reverse"} detail-reveal">
        <figure class="detail-media detail-challenge-media">
          <img src="${project.challenge3Image || project.gallery[0] || project.image}" alt="${project.title}">
        </figure>
        <article class="detail-challenge-copy">
          ${project.challenge3Title ? `<h2>${project.challenge3Title}</h2>` : ""}
          ${toHTML(project.challenge3Copy || "")}
        </article>
      </section>` : ""}

      ${project.challenge5Title || project.challenge5Copy ? `
      <section class="detail-challenge detail-challenge--reverse detail-reveal">
        <figure class="detail-media detail-challenge-media">
          ${project.challenge5Video
            ? `<div class="detail-media-phone"><video src="${project.challenge5Video}" autoplay loop muted playsinline></video></div>`
            : `<img src="${project.challenge5Image || project.gallery[0] || project.image}" alt="${project.title}">`}
        </figure>
        <article class="detail-challenge-copy">
          ${project.challenge5Title ? `<h2>${project.challenge5Title}</h2>` : ""}
          ${toHTML(project.challenge5Copy || "")}
        </article>
      </section>` : ""}

      ${project.fullscreenImage3 ? `
      <section class="${project.fullscreenImagesWide ? "detail-fullscreen detail-fullscreen--wide detail-reveal" : "detail-fullscreen detail-reveal"}">
        <img src="${project.fullscreenImage3}" alt="${project.title}">
      </section>` : ""}

      ${project.gallery2 && project.gallery2.length ? `
      <section class="detail-media-row detail-reveal">
        ${project.gallery2.slice(0, 2).map((img) => `
          <figure class="detail-media">
            <img src="${img}" alt="${project.title}">
          </figure>`).join("")}
      </section>` : ""}

      ${project.challenge4Title ? `
      <section class="detail-challenge detail-reveal">
        <figure class="detail-media detail-challenge-media">
          <img src="${project.challenge4Image || project.gallery[0] || project.image}" alt="${project.title}">
        </figure>
        <article class="detail-challenge-copy">
          <h2>${project.challenge4Title}</h2>
          ${toHTML(project.challenge4Copy || "")}
        </article>
      </section>` : ""}

      ${project.challenge7Title ? `
      <section class="detail-challenge detail-challenge--reverse detail-reveal">
        <figure class="detail-media detail-challenge-media">
          <img src="${project.challenge7Image || project.gallery[0] || project.image}" alt="${project.title}">
        </figure>
        <article class="detail-challenge-copy">
          <h2>${project.challenge7Title}</h2>
          ${toHTML(project.challenge7Copy || "")}
        </article>
      </section>` : ""}

      ${project.challenge6Title ? `
      <section class="detail-challenge detail-challenge--reverse detail-reveal">
        <figure class="detail-media detail-challenge-media">
          <img src="${project.challenge6Image || project.gallery[0] || project.image}" alt="${project.title}">
        </figure>
        <article class="detail-challenge-copy">
          <h2>${project.challenge6Title}</h2>
          ${toHTML(project.challenge6Copy || "")}
        </article>
      </section>` : ""}

      ${project.fullscreenImage4 ? `
      <section class="detail-fullscreen${project.fullscreenImage4Wide ? " detail-fullscreen--wide" : ""} detail-reveal">
        ${project.fullscreenLabel4 ? `<span class="detail-fullscreen-label" style="color:${project.fullscreenLabel4Color || '#fff'}">${project.fullscreenLabel4}</span>` : ""}
        <img src="${project.fullscreenImage4}" alt="${project.title}">
      </section>` : ""}

      ${project.fullscreenImage5 ? `
      <section class="${project.fullscreenImagesWide ? "detail-fullscreen detail-fullscreen--wide detail-reveal" : "detail-fullscreen detail-reveal"}">
        <img src="${project.fullscreenImage5}" alt="${project.title}">
      </section>` : ""}



      <section class="detail-next detail-reveal">
        <p>Discover more projects</p>
        <div class="detail-next-grid">
          ${related.map((item) => `
            <a href="/${item.slug}/">
              <img src="${item.image}" alt="${item.title}">
              <span>${item.title}</span>
              <span>${item.meta} ↗</span>
            </a>`).join("")}
        </div>
      </section>`;
  }

  // Hamburger menu
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const siteHeader = document.querySelector(".site-header");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      siteHeader && siteHeader.classList.toggle("menu-open", isOpen);
      navToggle.textContent = isOpen ? "Close" : "Menu";
      navToggle.setAttribute("aria-expanded", isOpen);
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        siteHeader && siteHeader.classList.remove("menu-open");
        navToggle.textContent = "Menu";
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  // Scroll reveal for detail sections
  const revealItems = document.querySelectorAll(".detail-reveal");
  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealItems.forEach((el) => observer.observe(el));
  }
})();
