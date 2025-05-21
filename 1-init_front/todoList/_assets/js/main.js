window.onload = () =>{
    const form = document.getElementById("todoForm")
    const saveLocalData = (data) =>{
        if("localStorage" in window){
            localStorage.setItem("todos", JSON.stringify(data))
        }
    }
    const getLocalData = () =>{
        if("localStorage" in window){
            return JSON.parse(localStorage.getItem("todos")) || []
        }else{
            return []
        }
    }
    const refetch = () =>{
        // const ul = document.querySelector("ul")
        const ul = document.getElementById("todoList")
        ul.innerHTML = ""
        todos.forEach((todo) => {
            
            const li = document.createElement("li")
            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Delete"
            deleteBtn.className = "btn btn-danger"
            deleteBtn.onclick = () => handleDelete(todo)
            const updateBtn = document.createElement("button")
            if(todo.isUpdating){
                // updating
                const input = document.createElement("input")
                input.value = todo.name
                input.onchange = (event) => handleUpdate(event,todo)
                updateBtn.innerText = "Save"
                updateBtn.className = "btn btn-warning"
                li.appendChild(input)
            }else{
                // display
                const span = document.createElement("span")
                span.innerHTML = todo.name
                updateBtn.innerText = "Update"
                updateBtn.className = "btn btn-primary"
                li.appendChild(span)
            }
            updateBtn.onclick = () => toggleUpdate(todo)
            li.appendChild(updateBtn)
            li.appendChild(deleteBtn)

            ul.appendChild(li)
        });
    }
    let todos = getLocalData()
    refetch()
    const toggleUpdate = (todo) =>{
        const index = todos.findIndex(t => t._id === todo._id)
        todos[index].isUpdating = !todo.isUpdating
        saveLocalData(todos)
        refetch()
    }
    const handleUpdate = (event, todo) =>{
        const name = event.target.value.trim()
        if(name){
            todo.name = name
            todo.updatedAt = new Date()
            const index = todos.findIndex(t => t._id === todo._id)
            todos[index] = todo
            saveLocalData(todos)
            // refetch()
        }
    }
    const handleDelete = ({_id}) =>{
        todos = todos.filter(todo => todo._id !== _id)
        saveLocalData(todos)
        refetch()
    }
    
    
    // form.addEventListener("submit", (event)=>{})
    form.onsubmit = (event) =>{
        event.preventDefault()
        const input = form.querySelector("input")
        const todoName = input.value.trim()
        if(todoName){
            const todo = {
                _id: Math.round(Math.random()*8585415),
                name: todoName,
                updatedAt: null,
                isUpdating: false,
                createdAt: new Date()
            }
            todos.push(todo)
            saveLocalData(todos)
            refetch()
        }
        form.reset()
        // console.log(todos);
    }
}