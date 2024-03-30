import { html, render } from '../lib.js';
import { getAllPunks } from '../data/events.js';


const dashboardTemplate = (items) => html`
<h3 class="heading">Market</h3>
<section id="dashboard">
    ${items.length ? items.map(itemTemplate) : html`<h3 class="empty">No Items Yet</h3>`}
</section>`;

const itemTemplate = (item) => html`
<div class="item">
    <img src="${item.imageUrl}" alt="example1" />
    <h3 class="model">${item.item}</h3>
    <div class="item-info">
        <p class="price">Price: €${item.price}</p>
        <p class="availability">${item.availability}</p>
        <p class="type">Type: ${item.type}</p>
    </div>
    <a class="details-btn" href="/catalog/${item._id}">Uncover More</a>
</div>`;

export async function showDashboard(ctx) {
    const items = await getAllPunks();
    render(dashboardTemplate(items));
}