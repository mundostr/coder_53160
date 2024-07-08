const API_ORDERS_URL = "http://localhost:5000/api/orders";

const getOrders = async () => {
    const domOrdersList = document.getElementById("orders");
    while (domOrdersList.firstChild) domOrdersList.removeChild(domOrdersList.firstChild);

    try {
        const response = await fetch(API_ORDERS_URL);
        const jsonResponse = await response.json();
        const orders = jsonResponse.data;

        orders.forEach(order => {
            const li = document.createElement("li");

            li.classList.add("list-group-item");
            li.textContent = `${order.user.lastName}, ${order.user.firstName}: pedido a ${order.business.name} $ ${order.totalPrice} -> ${order.status === 'pending' ? "en proceso" : order.status === "ready" ? "lista" : "entregada"}`;
            li.style.backgroundColor = order.delivered ? "lightgreen" : "#f90";

            domOrdersList.appendChild(li);
        });
    } catch (err) {
        switch (err.message) {
            case "Failed to fetch":
                domOrdersList.innerHTML = `ERROR al conectar a ${API_ORDERS_URL}. Por favor verifique ruta y disponibilidad de la API.`;
                domOrdersList.style.backgroundColor = "#fc0";
                break;

            default:
        }
    }
};

getOrders();
