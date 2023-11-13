const inpProductName = document.getElementById("inpProductName");
const inpProductDesc = document.getElementById("inpProductDesc");
const inpProductAmount = document.getElementById("inpProductAmount");
const btnProductAdd = document.getElementById("btnProductAdd");
const divTable = document.getElementById("divTable");

let idProduct = 0;

const inpProductNameUpdate = document.getElementById("inpProductNameUpdate");
const inpProductDescUpdate = document.getElementById("inpProductDescUpdate");
const inpProductAmountUpdate = document.getElementById("inpProductAmountUpdate");

const productsFromLocalStorage = JSON.parse(localStorage.getItem("products")) || [];

function updateTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    productsFromLocalStorage.forEach(product => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <tr id="${product.id}">
                <td>${product.name}</td>
                <td>${product.desc}</td>
                <td>${new Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" }).format(product.amount)}</td>
                <td class="columnAction">
                    <button class="bntProductDelete" onclick="deleteProduct(${product.id})"><i class='bx bx-trash'></i></button>
                </td>
            </tr>
        `;
        tbody.appendChild(tr);
    });
}

function addProductToLocalStorage(name, desc, amount) {
    idProduct++
    const newProduct = { id: idProduct, name, desc, amount };
    productsFromLocalStorage.push(newProduct);
    localStorage.setItem("products", JSON.stringify(productsFromLocalStorage));
}

function deleteProduct(id) {
    const index = productsFromLocalStorage.findIndex(product => product.id === id);
    if (index !== -1) {
        productsFromLocalStorage.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(productsFromLocalStorage));
        updateTable();

        const divSuccess = document.getElementById("success");
        const spanSuccessInpts = document.createElement("span");
        divSuccess.appendChild(spanSuccessInpts);
        setTimeout(() => {
            divSuccess.removeChild(spanSuccessInpts);
        }, 3000);

        return spanSuccessInpts.innerHTML = `<p>Produto deletado com sucesso.</p>`;
    }
}

btnProductAdd.addEventListener("click", () => {
    const inpProductNameValue = inpProductName.value;
    const inpProductDescValue = inpProductDesc.value;
    const inpProductAmountValue = inpProductAmount.value;

    if (inpProductNameValue === "" && inpProductDescValue === "" && inpProductAmountValue === "") {
        const divErrors = document.getElementById("errors");
        const spanErrorInpts = document.createElement("span");
        divErrors.appendChild(spanErrorInpts);
        setTimeout(() => {
            divErrors.removeChild(spanErrorInpts);
        }, 3000);
        return spanErrorInpts.innerHTML = `<p>Você não inseriu nada para poder adicionar o produto.</p>`;
    } else {
        addProductToLocalStorage(inpProductNameValue, inpProductDescValue, inpProductAmountValue);

        const divSuccess = document.getElementById("success");
        const spanSuccessInpts = document.createElement("span");
        divSuccess.appendChild(spanSuccessInpts);
        setTimeout(() => {
            divSuccess.removeChild(spanSuccessInpts);
        }, 3000);

        updateTable();

        inpProductName.value = "";
        inpProductDesc.value = "";
        inpProductAmount.value = "";

        return spanSuccessInpts.innerHTML = `<p>Produto adicionado com sucesso.</p>`;
    }
});

updateTable();