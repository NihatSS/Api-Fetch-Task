"use strict";

let elem = document.querySelector(".category-list");

function getAllCategories(){
    fetch('https://localhost:7058/api/admin/category/getAll')
    .then(response => response.json())
    .then(categories => {
        let str = "";
        categories.forEach(category => {

            str += `<li class="list-group-item d-flex justify-content-between">
                        <span>${category.name}</span>
                        <button data-id=${category.id} class="btn btn-danger delete-category">Delete</button>
                    </li>`;
        });

        elem.innerHTML = str;

        let deleteBtns = document.querySelectorAll(".delete-category");

        deleteBtns.forEach(btn => {
            btn.addEventListener("click",function(){
                fetch('https://localhost:7058/api/admin/category/delete/' + parseInt(btn.getAttribute("data-id")), {
                    method: 'DELETE',
                  })
                  .then(res => res.text())
                  .then(res => {
                    btn.parentNode.remove();
                  })
            })
        });
    })
}

function createCategory(){
    addBtn.addEventListener("click", function(){
        let categoryName = document.querySelector(".create-category-input").value;
        fetch('https://localhost:7058/api/admin/category/create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: categoryName})
          }).then(res => res.text())
          .then(res => {
            getAllCategories()
          })
    })
}



let addBtn = document.querySelector(".create-category");

getAllCategories();
createBtnStatus();
createCategory();
editCategory();


function createBtnStatus(){
    document.querySelector(".create-category-input").addEventListener("keyup", function(){
        if (this.value.trim() == "") {
            addBtn.setAttribute("disabled","");
            this.nextElementSibling.classList.remove("d-none");
        }else{
            addBtn.removeAttribute("disabled")
            this.nextElementSibling.classList.add("d-none");
        }
    })

    document.querySelectorAll(".edit-category-input").forEach(input => {
        input.addEventListener("keyup", function () {
            const editBtn = this.closest(".modal-footer").querySelector(".edit-category");
            if (this.value.trim() === "") {
                editBtn.setAttribute("disabled", "");
                this.nextElementSibling.classList.remove("d-none");
            } else {
                editBtn.removeAttribute("disabled");
                this.nextElementSibling.classList.add("d-none");
            }
        });
    });
    
    
}

