document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const app = document.getElementById('app');
      let html = '';

      // Header
      html += `
        <header id="header" class="alt">
          <a href="index.html" class="logo"><strong>${data.header.logo}</strong></a>
          <nav>
            <a href="#menu">Menu</a>
          </nav>
        </header>
        <nav id="menu">
          <ul class="links">
            ${data.header.nav_links.map(link => `
              <li><a href="${link.href}" class="${link.class}">${link.text}</a></li>
            `).join('')}
          </ul>
          <ul class="actions stacked">
            ${data.header.dropdown.items.map(item => `
              <li><a href="${item.href}" class="button fit">${item.text}</a></li>
            `).join('')}
          </ul>
        </nav>
      `;

      // Menu Section
      html += `
        <section id="menu" class="wrapper style1">
          <div class="container">
            <header class="major">
              <h3>${data.menu.notice}</h3>
            </header>
            <header class="major">
              <h2>${data.menu.title}</h2>
            </header>
      `;

      data.menu.categories.forEach(category => {
        html += `
          <section id="${category.id}"></section>
          <header class="major">
            <h2>${category.title}</h2>
            <h3>${category.subtitle}</h3>
          </header>
          <div class="row">
            <div style="display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 20px; padding: 20px; max-width: 1200px; margin: 0 auto;">
        `;

        category.products.forEach(product => {
          html += `
            <div class="col-4 col-6-medium col-12-small" style="flex: 1 1 calc(33.33% - 20px); box-sizing: border-box;">
              <article class="box post">
                <a href="#" class="image fit">
                  <img src="${product.image}" alt="${product.alt}">
                </a>
                <h3>${product.name}</h3>
                <div class="table-wrapper">
                  <table>
                    <tbody>
                      ${product.pricing.map(price => `
                        <tr>
                          <td>${price.option}</td>
                          <td>${price.price}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
                <form name="contact" action="https://formspree.io/f/mleqvqjn" method="POST">
                  <div class="col-6 col-12">
                    <input type="text" name="name" id="name-${product.name.replace(/\s+/g, '-')}" value="" placeholder="Name" required>
                  </div>
                  <br>
                  <div class="col-6 col-12-large">
                    <input type="text" name="email" id="email-${product.name.replace(/\s+/g, '-')}" value="" placeholder="Email or Phone" required>
                  </div>
                  <br>
                  ${product.form_selects.map((select, index) => `
                    <div class="col-6">
                      <select name="${select.name}" id="${select.name}-${product.name.replace(/\s+/g, '-')}-${index}" required>
                        <option value="">- ${select.label || 'Select'} -</option>
                        ${select.options.map(option => `
                          <option value="${option.value}">${option.display}</option>
                        `).join('')}
                      </select>
                    </div>
                    <br>
                  `).join('')}
                  <div class="col-6 col-12-large">
                    <input type="text" name="address" id="address-${product.name.replace(/\s+/g, '-')}" value="" placeholder="Delivery Address (If Applicable)">
                  </div>
                  <br>
                  <div class="col-12">
                    <textarea name="message" id="message-${product.name.replace(/\s+/g, '-')}" placeholder="Add a message" rows="1"></textarea>
                  </div>
                  <br>
                  <ul class="actions">
                    <li>
                      <input type="submit" value="Submit Order">
                      <input type="button" value="More Info" onclick="window.location.href='${product.more_info_link}';">
                    </li>
                  </ul>
                </form>
              </article>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </section>
      `;

      // Footer
      html += `
        <footer id="footer">
          <div class="inner">
            <ul class="icons">
              ${data.footer.social_links.map(link => `
                <li><a href="${link.href}" class="${link.class}"><span class="label">${link.href.split('.')[1]}</span></a></li>
              `).join('')}
            </ul>
            <ul class="contact">
              <li><h3>${data.footer.contact.title}</h3></li>
              <li>${data.footer.contact.address}</li>
              <li>${data.footer.contact.phone}</li>
              <li><a href="mailto:${data.footer.contact.email}">${data.footer.contact.email}</a></li>
            </ul>
            <ul class="copyright">
              <li>${data.footer.copyright}</li>
            </ul>
          </div>
        </footer>
      `;

      app.innerHTML = html;
    })
    .catch(error => console.error('Error loading products.json:', error));
});