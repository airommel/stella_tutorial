
function initData() {
    let dummyData = [
        { id: 1, name: "Item 1", status: "pending", remarks: "", date: new Date() },
        { id: 2, name: "Item 2", status: "completed", remarks: "Good job", date: new Date() },
        { id: 3, name: "Item 3", status: "pending", remarks: "", date: new Date() },
        { id: 4, name: "Item 4", status: "rejected", remarks: "Not suitable", date: new Date() }
    ];

    localStorage.setItem("dummyData", JSON.stringify(dummyData));
}

if (localStorage.getItem("dummyData") === null) {
    initData();

}

document.querySelector("#init").addEventListener("click", () => {
    initData();
    renderTable();
})



// load data from localStorage,then render table
function renderTable() {


    dummyData = JSON.parse(localStorage.getItem("dummyData"));

    document.querySelector("#data-table").innerHTML = ``

    let template = `
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Status</th>
    <th>Remarks</th>
  </tr>
`

    for (let object of dummyData) {
        template += `
  <tr>
    <td>${object.id}</td>
    <td>${object.name}</td>
    <td>${object.status}</td>
    <td>${object.remarks}</td>
    `
        if (object.status === "pending") {
            template += `
    <td><button data-id="${object.id}" class="approve-btn">Approve</button></td>
    <td><button data-id="${object.id}" class="reject-btn">Reject</button></td>`
        } else {
            template += `
    <td><button data-id="${object.id}" class="view-btn">View</button></td>`
        }
        template += `
  </tr>`
    }

    document.querySelector("#data-table").innerHTML = template;
    attachEventListeners();
}

renderTable();

function attachEventListeners() {
    document.querySelectorAll(".approve-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            // Handle approve action
            console.log("Approving item with ID:", id);
            handleApprove(id);
        });
    });

    document.querySelectorAll(".reject-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            handleReject(id)
        });
    });

    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            // Handle view action
            console.log("Viewing item with ID:", id);
        });
    });
}

attachEventListeners();

function handleApprove(id) {

    // create remarks form
    document.querySelector(".remarks-container").innerHTML = `
      <form class="remarks-form">
        <label for="remarks">Enter Remarks for item${id}:</label>
        <textarea id="remarks" placeholder="Enter remarks..."></textarea>
        <button type="submit" class="submit">Submit Remarks</button>
        <button type="button" class="cancel">Cancel</button>
      </form>
    `;
    attachFormEventListeners(id);
}

function attachFormEventListeners(id) {
    let main = document.querySelector(".remarks-container")

    main.querySelector(".cancel").addEventListener("click", () => {
        main.innerHTML = "";
    })

    main.querySelector(".submit").addEventListener("click", (e) => {
        e.preventDefault();

        handleSumbitRemarks(main, id);
    });
}

function handleSumbitRemarks(main, id) {

    const remarks = main.querySelector("#remarks").value;
    console.log("Submitting remarks for item:", id);
    // Handle remarks submission

    const dummyData = JSON.parse(localStorage.getItem("dummyData"));

    const updatedData = dummyData.map(item => {
        if (item.id == id) {
            console.log("found")

            return { ...item, status: "completed", remarks: remarks };
        }
        return item;
    });

    localStorage.setItem("dummyData", JSON.stringify(updatedData));
    renderTable();
    main.innerHTML = "";
}

function handleReject(id) {
    // Handle reject action
    console.log("Rejecting item with ID:", id);
    const dummyData = JSON.parse(localStorage.getItem("dummyData"));
    const updatedData = dummyData.map(item => {
        if (item.id == id) {
            console.log("found")
            // item.status = "rejected";
            return { ...item, status: "rejected" };
        }
        return item;
    });


    localStorage.setItem("dummyData", JSON.stringify(updatedData));
    renderTable()

}

