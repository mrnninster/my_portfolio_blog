// Flash query response function
function flash_response(message, status){
    // Flash response
    const flashed = document.getElementById("flashes")
    let flash = `<li>
        <div class="alert alert-${status}">
            ${message}
            <input type="button" class="alert-cancel dismiss" id="alert-cancel" value="X">
        </div>
    </li>
    `
    flashed.innerHTML = flash

    const buttons = document.getElementsByClassName("dismiss")

    for (let i=0; i < buttons.length; i++){
        let button = buttons[i]

        button.addEventListener("click",() => {
            button.parentElement.style.display = "none"
        })
    }
}


// Clear Display Screen Function
function form_display(){
    let forms = document.getElementsByTagName("form")
    for (const form of forms){
        form.classList.add("remove_display")
    }

    const section_two = document.getElementsByClassName("section_two")
    for (const elem_child of section_two[0].children){
        elem_child.classList.add("remove_display")
    }

    // Education Records
    const education_records = document.querySelector(".education_record")
    education_records.classList.add("remove_display")

    // Companies Records
    const available_companies = document.getElementById("companies")
    available_companies.classList.add("remove_display")

    // ExperienCe Records
    const experience_records = document.querySelector(".experience_records")
    experience_records.classList.add("remove_display")

    // Certification Records
    const certification_records = document.querySelector(".certificate_records")
    certification_records.classList.add("remove_display")

    // Stack Records
    const stack_records = document.querySelector(".stack_records")
    stack_records.classList.add("remove_display")

    // Project Records
    const project_records = document.querySelector(".work_records")
    project_records.classList.add("remove_display")
}

// Run clear Display Screen
form_display()


// Add Event Listener to Section Selector 
const section_name = document.getElementById("section_name")
section_name.addEventListener("change", () =>{
    form_display()
    const elements_in_view = document.querySelectorAll(`.${section_name.value}`)
    elements_in_view.forEach((element_in_view) => {
        element_in_view.classList.toggle("remove_display")
    })
})



// Display Welcome Content 
const welcome = document.querySelectorAll(".welcome_content")
welcome.forEach((welcome_element) => {
    welcome_element.classList.remove("remove_display")
})


// Resume Introduction Preview
const welcome_textarea = document.getElementById("welcome_textarea")
const preview_content_text = document.querySelector(".hero_content")
const welcome_save_btn = document.querySelector(".welcome_save_btn")


// Display Content In Preview Section
function preview_content(preview_content,welcome_textarea){
    preview_content.innerText = welcome_textarea.value
}


// Preview Event Listener
welcome_textarea.addEventListener("input",() => {
    preview_content_text.innerText = welcome_textarea.value
})


// Show current welcome text
preview_content(preview_content_text,welcome_textarea)


// Save Welcome Text
welcome_save_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("welcome_text", welcome_textarea.value)

    const xhr = new XMLHttpRequest()
    xhr.open("POST","/blog/update_welcome_text",true)
    xhr.send(form)

    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const message = data["message"].toLowerCase()
        const status = data["status"].toLowerCase()

        // Show response
        flash_response(message,status)
    }
})


// About Section Preview
const about_textarea = document.getElementById("about_textarea")
const about_intro = document.querySelector(".about_intro")
const about_save_btn = document.querySelector(".about_save_btn")


// Preview Event Listener
about_textarea.addEventListener("input",() => {
    preview_content(about_intro,about_textarea)
})


// Show current welcome text
preview_content(about_intro,about_textarea)


// Save Welcome Text Button
about_save_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("about_text", about_textarea.value)

    const xhr = new XMLHttpRequest()
    xhr.open("POST","/blog/update_about_text",true)
    xhr.send(form)

    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const message = data["message"].toLowerCase()
        const status = data["status"].toLowerCase()

        // Show response
        flash_response(message,status)
    }
})


// Work Section Preview
const work_textarea = document.getElementById("work_textarea")
const work_intro = document.querySelector(".work_intro")
const work_save_btn = document.querySelector(".work_save_btn")


// Preview Event Listener
work_textarea.addEventListener("input",() => {
    preview_content(work_intro,work_textarea)
})


// Show current welcome text
preview_content(work_intro,work_textarea)


// Save Work Text Button
work_save_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("work_text", work_textarea.value)

    const xhr = new XMLHttpRequest()
    xhr.open("POST","/blog/update_work_text",true)
    xhr.send(form)

    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const message = data["message"].toLowerCase()
        const status = data["status"].toLowerCase()

        // Show response
        flash_response(message,status)
    }
})


// Education Section
const clear_form_btn = document.getElementById("clear_btn")
const name_fied = document.getElementById("Name")
const location_field = document.getElementById("Location")
const start_date_field = document.getElementById("Start_Date")
const End_date_field = document.getElementById("End_Date")
const Qualification = document.getElementById("Qualification")
const Save_btn = document.querySelector(".education_btn")
const Edit_btn = document.querySelector(".edit_btn")

// Clear Fields Data
function clear_form_fields(){
    name_fied.value = ""
    location_field.value = ""
    start_date_field.selectedIndex = 0;
    End_date_field.selectedIndex = 0;
    Qualification.value = ""

    Save_btn.classList.remove("remove_display")
    Edit_btn.classList.add("remove_display")
}

// Display Education Items
function display_education_items(item_list){
    const education_items = document.querySelector(".education_items")
    education_items.innerHTML = ""

    for(item of item_list){
        // Create Elements
        const education_item = document.createElement("div")
    
        const education_year = document.createElement("div")
        const year_paragraph = document.createElement("p")
    
        const education_instituition = document.createElement("div")
        const instituition_paragraph = document.createElement("p")
        const instituition_location = document.createElement("small")
    
        const award = document.createElement("div")
        
        // Create Qualifiation Element
        award.innerText = item["Qualification"]
        award.classList.add("education_award_name")

        // Create Instituition Element
        instituition_location.innerText = item["Location"]
        instituition_location.classList.add("education_location")
        instituition_paragraph.innerText = item["Instituition"]
        education_instituition.appendChild(instituition_paragraph)
        education_instituition.appendChild(instituition_location)
        education_instituition.classList.add("education_instituition")

        // Create Attendance Year Element
        year_paragraph.innerText = `${item["start_year"]} - ${item["end_year"]}`
        education_year.appendChild(year_paragraph)
        education_year.classList.add("education_year")

        // Create education element
        education_item.appendChild(education_year)
        education_item.appendChild(education_instituition)
        education_item.appendChild(award)

        education_items.appendChild(education_item)
    }
}

// Fetch Education Data
function fetch_education_records(){
    const new_promise = new Promise((resolve,reject) => {

        const xhr = new XMLHttpRequest()
        xhr.open("GET", "/blog/fetch_education_records", true)
        xhr.send()
        xhr.onload = () => {
            if (200 <= xhr.status && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText)
                resolve(data)
            }
            else {
                reject("Unable to fetch saved records","failed")
            }
        }
    })
    .then((data) => {
        const status = data["status"].toLowerCase()

        // Show response
        if (status != "success"){
            const message = data["message"].toLowerCase()
            flash_response(message,status)
            return
        }

        // Clear Records List
        const edu_records = document.querySelector(".records_list")
        edu_records.innerHTML = ""

        // Create Elements
        const trash_element = document.createElement("div")
        const edit_element = document.createElement("div")

        trash_element.classList.add("trash_icon")
        trash_element.innerText = 'DELETE'

        edit_element.classList.add("edit_icon")
        edit_element.innerText = 'EDIT'

        // Display In Page
        for(const qualification of data["message"]["dict"]){
            const records_element = document.createElement("div")
            const qualification_element = document.createElement("div")

            records_element.classList.add("records")

            qualification_element.classList.add("credential")
            qualification_element.id = qualification["id"]
            qualification_element.innerText = qualification["Qualification"]

            const trash_element_clone = trash_element.cloneNode(true)
            const edit_element_clone = edit_element.cloneNode(true)

            // Add Event Listener to Edit Element
            edit_element_clone.addEventListener("click", () => {
                name_fied.value = qualification["Instituition"]
                location_field.value = qualification["Location"]
                Qualification.value = qualification["Qualification"]
                start_date_field.value = qualification["start_year"]
                End_date_field.value = qualification["end_year"]
            
                Save_btn.classList.add("remove_display")
                Edit_btn.classList.remove("remove_display")
                Edit_btn.id = qualification["id"]
            })

            // Add Event Listener To Trash Element
            trash_element_clone.addEventListener("click", () => {
                new Promise((resolve) => {
                    const record_id = qualification["id"]
                    const xhr = new XMLHttpRequest()
                    const form = new FormData()
    
                    form.append("csrf_token", csrf_token.value)
                    form.append("record_id",record_id)
    
                    xhr.open("POST","/blog/remove_education",true)
                    xhr.send(form)
                    xhr.onload = () => {
                        const data = JSON.parse(xhr.responseText)
                        const message = data["message"].toLowerCase()
                        const status = data["status"].toLowerCase()
                
                        // Show response
                        flash_response(message,status)
                    }
                    resolve()
                })

                .then(() => {
                    // Refresh Eduation Records
                    fetch_education_records()
                })
            })

            records_element.appendChild(qualification_element)
            records_element.appendChild(trash_element_clone)
            records_element.appendChild(edit_element_clone)

            edu_records.appendChild(records_element);
        }

        display_education_items(data["message"]["dict"])
    })
    .catch((message,status) => {
        flash_response(message,status)
    })
}


// Show Education Records
fetch_education_records()


// Clear Education Form Field
clear_form_btn.addEventListener("click", (e) => {
    e.preventDefault()
    clear_form_fields()
})


// Save Education Button
Save_btn.addEventListener("click", (e) => {
    e.preventDefault()

    new Promise((resolve) => {
        const form = new FormData()
        form.append("csrf_token", csrf_token.value)
        form.append("name", name_fied.value)
        form.append("location", location_field.value)
        form.append("start_date", start_date_field.value)
        form.append("end_date", End_date_field.value)
        form.append("qualification", Qualification.value)
    
        const xhr = new XMLHttpRequest()
        xhr.open("POST","/blog/add_education",true)
        xhr.send(form)
    
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            const message = data["message"].toLowerCase()
            const status = data["status"].toLowerCase()
    
            // Show response
            flash_response(message,status)
        }
        resolve()
    })
    .then(() => {
        // Clear Form Fields
        clear_form_btn.click()
        
        // Refresh Saved Education data preview
        fetch_education_records()
    })
})


// Edit Education Button
Edit_btn.addEventListener("click",(e) => {
    e.preventDefault()

    new Promise((resolve) => {
        const qualifiation_id = Edit_btn.id
        const form = new FormData()
    
        form.append("csrf_token", csrf_token.value)
        form.append("record_id", qualifiation_id)
        form.append("name", name_fied.value)
        form.append("location", location_field.value)
        form.append("start_date", start_date_field.value)
        form.append("end_date", End_date_field.value)
        form.append("qualification", Qualification.value)
    
        const xhr = new XMLHttpRequest()
        xhr.open("POST","/blog/update_education",true)
        xhr.send(form)
    
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            const message = data["message"].toLowerCase()
            const status = data["status"].toLowerCase()
    
            // Show response
            flash_response(message,status)
        }
        resolve()
    })
    .then(() => {
        // Clear Form Fields
        clear_form_btn.click()

        // Refresh Saved Education data preview
        fetch_education_records()
    })
})


// Refresh Available companies Function
function refresh_available_companies(){
    const available_companies = document.querySelector(".available_companies")
    available_companies.innerHTML = ""
    let color_types = ["blue","green","red"]

    const xhr = new XMLHttpRequest()
    xhr.open("GET","/blog/fetch_companies",true)
    xhr.send()
    xhr.onload = () =>{
        const data = JSON.parse(xhr.responseText)
    
        for (const company of data["message"]["dict"]){
            const a = document.createElement("a")
            const content_div = document.createElement("div")
            const remove_div = document.createElement("div")
            const random_color = color_types[Math.floor(Math.random() * color_types.length)];

            remove_div.innerText = 'x'
            remove_div.classList.add("remove_icon")
            remove_div.id = `${company["company_uuid"]}`

            remove_div.addEventListener("click",() => {

                const form = new FormData()
                form.append("csrf_token",csrf_token.value)
                form.append("company_id",`${company["company_uuid"]}`)

                const remove_xhr = new XMLHttpRequest()
                remove_xhr.open("POST","/blog/remove_company",true)
                remove_xhr.send(form)

                remove_xhr.onload = () => {
                    const data = JSON.parse(remove_xhr.responseText)
                    const message = data["message"].toLowerCase()
                    const status = data["status"].toLowerCase()
            
                    // Show response
                    flash_response(message,status)
                }
                refresh_available_companies()
            })

            a.innerText = company["company_name"]
            a.setAttribute("href",`${company["company_url"]}`)

            content_div.appendChild(a)
            content_div.appendChild(remove_div)
    
            content_div.classList.add("company",`${random_color}`)
            available_companies.appendChild(content_div)
        }
    }
}
refresh_available_companies()


// Add Company Button
const add_company_btn = document.getElementById("add_company_btn")
add_company_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const company_name = document.getElementById("company_name")
    const company_url = document.getElementById("company_url")

    new Promise((resolve) => {
        const form = new FormData
        form.append("csrf_token", csrf_token.value)
        form.append("company_name", company_name.value)
        form.append("company_url", company_url.value)

        const xhr = new XMLHttpRequest()
        xhr.open("POST","/blog/add_company",true)
        xhr.send(form)

        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            const message = data["message"].toLowerCase()
            const status = data["status"].toLowerCase()
    
            // Show response
            flash_response(message,status)
        }
        resolve()
    })
    .then(() => {
        refresh_available_companies()
    })
})


// Clear Experience Form Function
function clear_experience_form(){
    const company_name = document.getElementById("CompanyName")
    const company_role = document.getElementById("Role")
    const company_role_description = document.getElementById("Role_description")
    const start_month = document.getElementById("Start_Month")
    const start_year = document.getElementById("Start_Year")
    const end_month = document.getElementById("End_Month")
    const end_year = document.getElementById("End_Year")
    const save_btn = document.getElementById("save_experience_btn")
    const edit_options = document.querySelector(".edit_options")

    edit_options.classList.add("remove_display")
    save_btn.classList.remove("remove_display")

    company_name.selectedIndex = 0
    company_role.value = ""
    company_role_description.value = ""
    start_month.selectedIndex = 0
    start_year.selectedIndex = 0
    end_month.selectedIndex = 0
    end_year.selectedIndex = 0
}


// Update Experience Display Section Function
function update_experience_display(){
    const experience_records = document.querySelector(".experience_records")
    experience_records.innerHTML = ""

    // Fetch List Of Experience 
    const exp_xhr = new XMLHttpRequest()
    exp_xhr.open("GET","/blog/fetch_experience",true)
    exp_xhr.send()

    exp_xhr.onload = () => {
        const data = JSON.parse(exp_xhr.responseText)
        const status = data["status"].toLowerCase()
        const message = data["message"]

        if (status != "success"){
            flash_response(message, status)
            return
        }
        else{
    
            for (const company in message){
                for (const experience of message[company]){
                    const experience_record = document.createElement("div")
                    const experience_company_name = document.createElement("div")
                    const experience_role = document.createElement("div")
                    const experience_delete = document.createElement("div")
                    const experience_edit = document.createElement("div")

                    // delete Experience
                    experience_delete.innerText = "DELETE"
                    experience_delete.addEventListener("click",() => {
                        const form = new FormData()
                        form.append("csrf_token",csrf_token.value)
                        form.append("experience_id", experience["id"])
                        
                        const xhr = new XMLHttpRequest()
                        xhr.open("POST","/blog/delete_experience",true)
                        xhr.send(form)
                        xhr.onload = () => {
                            const data = JSON.parse(xhr.responseText)
                            const message = data["message"]
                            const status = data["status"]

                            flash_response(message,status)
                            load_experience_preview()
                        }
                    })

                    // Edit Experience
                    experience_edit.innerText = "EDIT"
                    experience_edit.addEventListener("click", () => {
                        const company_name = document.getElementById("CompanyName")
                        const company_role = document.getElementById("Role")
                        const company_role_description = document.getElementById("Role_description")
                        const start_month = document.getElementById("Start_Month")
                        const start_year = document.getElementById("Start_Year")
                        const end_month = document.getElementById("End_Month")
                        const end_year = document.getElementById("End_Year")
                        const save_btn = document.getElementById("save_experience_btn")
                        const edit_options = document.querySelector(".edit_options")
                        const edit_btn = document.querySelector(".edit_experience_btn")

                        save_btn.classList.add("remove_display")
                        edit_options.classList.remove("remove_display")
                        edit_btn.id = experience["id"]

                        company_name.value = experience["company_name"].toUpperCase()
                        company_role.value = experience["role_name"]
                        company_role_description.value = experience["role_description"]
                        
                        const edit_start_year = new Date(experience["start_year"])
                        start_month.value = `${edit_start_year.getMonth() + 1}`
                        start_year.value = edit_start_year.getFullYear()
                        
                        const edit_end_year = new Date(experience["end_year"])
                        end_month.value = `${edit_end_year.getMonth() + 1}`
                        end_year.value = edit_end_year.getFullYear()
                    })

                    experience_role.innerText = experience["role_name"]
                    experience_company_name.innerText = experience["company_name"]

                    experience_record.appendChild(experience_company_name)
                    experience_record.appendChild(experience_role)
                    experience_record.appendChild(experience_delete)
                    experience_record.appendChild(experience_edit)

                    experience_record.classList.add("experience_record")
                    experience_company_name.classList.add("experience_company_name")
                    experience_role.classList.add("experience_role")
                    experience_delete.classList.add("experience_delete")
                    experience_edit.classList.add("experience_edit")

                    experience_records.appendChild(experience_record)
                }
            }
        }
    }
}


// Display Experience Preview Function
function load_experience_preview(){
    const about_experience = document.querySelector(".about_experience")
    const experience_items = document.querySelector(".experience_items")
    experience_items.innerHTML = ""

    new Promise((resolve, reject) => {

        const exp_xhr = new XMLHttpRequest()
        exp_xhr.open("GET","/blog/fetch_experience",true)
        exp_xhr.send()

        exp_xhr.onload = () => {
            let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            const data = JSON.parse(exp_xhr.responseText)
            const message = data["message"]
            const status = data["status"].toLowerCase()

            if(status == "success"){
                // Update Preview Display
                for(const company in message){
                    // Create Company Experience Header
                    const experience_item = document.createElement("div")
                    const experience_company = document.createElement("div")
                    const experience_item_p = document.createElement("p")
                    const experience_company_positions = document.createElement("div")

                    experience_item.classList.add("experience_item")
                    experience_company.classList.add("experience_company")
                    experience_item_p.classList.add("_company")

                    experience_item_p.innerText = company
                    experience_company.appendChild(experience_item_p)
                    experience_item.appendChild(experience_company)

                    // Add Individual Company Experience
                    for (const experience of message[company]){
                        const company_position = document.createElement("div")
                        const position_year = document.createElement("div")
                        const position_name = document.createElement("div")
                        const position_description = document.createElement("div")

                        experience_company_positions.classList.add("experience_company_positions")
                        company_position.classList.add("company_position")
                        position_year.classList.add("position_year")
                        position_name.classList.add("position_name")
                        position_description.classList.add("position_description")

                        position_description.innerText = experience["role_description"]
                        position_name.innerText = experience["role_name"]

                        const experience_start_date = new Date(experience["start_year"])
                        const experience_end_date = new Date(experience["end_year"])

                        const exp_start_month = months[experience_start_date.getMonth()]
                        const exp_start_year = experience_start_date.getFullYear()
                        const exp_end_month = months[experience_end_date.getMonth()]
                        const exp_end_year = experience_end_date.getFullYear()
                        position_year.innerText =  `${exp_start_month}, ${exp_start_year} - ${exp_end_month}, ${exp_end_year}`

                        company_position.appendChild(position_year)
                        company_position.appendChild(position_name)
                        company_position.appendChild(position_description)

                        experience_company_positions.appendChild(company_position)
                        experience_item.appendChild(experience_company_positions)
                    }

                    experience_items.appendChild(experience_item)
                }

                update_experience_display()
            }
        }
    })
    about_experience.appendChild(experience_items)
}
load_experience_preview()


// Save Experience Button
const save_experience_btn = document.getElementById("save_experience_btn")
save_experience_btn.addEventListener("click", (e) => {
    e.preventDefault()

    new Promise((resolve) => {
        const company_name = document.getElementById("CompanyName")
        const role = document.getElementById("Role")
        const role_desc = document.getElementById("Role_description")
        const start_month = document.getElementById("Start_Month")
        const start_year = document.getElementById("Start_Year")
        const end_month = document.getElementById("End_Month")
        const end_year = document.getElementById("End_Year")
    
        const form = new FormData()
        form.append("csrf_token", csrf_token.value)
        form.append("company_name",company_name.value)
        form.append("role",role.value)
        form.append("role_description",role_desc.value)
        form.append("start_month",start_month.value)
        form.append("start_year",start_year.value)
        form.append("end_month", end_month.value)
        form.append("end_year", end_year.value)
    
        const xhr = new XMLHttpRequest()
        xhr.open("POST","/blog/add_experience",true)
        xhr.send(form)
        xhr.onload = () =>{
            const data = JSON.parse(xhr.responseText)
            const message = data["message"]
            const status = data["status"]
    
            flash_response(message, status)
        }
        resolve("success")
    })
    .then((status) => {
        if (status == "success"){
            load_experience_preview()
            clear_experience_form()
        }
    })
})


// Clear Experience Form Button
const experience_clear_btn = document.querySelector(".clear_experience_btn")
experience_clear_btn.addEventListener("click", (e) => {
    e.preventDefault()
    clear_experience_form()
}) 


// Edit Experience Form Button
const experience_edit_btn = document.querySelector(".edit_experience_btn")
experience_edit_btn.addEventListener("click", (e) => {
    e.preventDefault()

    new Promise((resolve) => {
        const company_name = document.getElementById("CompanyName")
        const role = document.getElementById("Role")
        const role_desc = document.getElementById("Role_description")
        const start_month = document.getElementById("Start_Month")
        const start_year = document.getElementById("Start_Year")
        const end_month = document.getElementById("End_Month")
        const end_year = document.getElementById("End_Year")
    
        const form = new FormData()
        form.append("csrf_token", csrf_token.value)
        form.append("company_name",company_name.value)
        form.append("role",role.value)
        form.append("role_description",role_desc.value)
        form.append("start_month",start_month.value)
        form.append("start_year",start_year.value)
        form.append("end_month", end_month.value)
        form.append("end_year", end_year.value)
        form.append("experience_id", experience_edit_btn.id)
    
        const xhr = new XMLHttpRequest()
        xhr.open("POST","/blog/update_experience",true)
        xhr.send(form)
        xhr.onload = () =>{
            const data = JSON.parse(xhr.responseText)
            const message = data["message"]
            const status = data["status"]
    
            flash_response(message, status)
        }
        resolve("success")
    })
    .then((status) => {
        if (status == "success"){
            load_experience_preview()
            clear_experience_form()
        }
    })
})


// Fetch Certifications Function
function fetch_all_certificates(){
    return new Promise((resolve) => {
        const certifcates_xhr = new XMLHttpRequest()
        certifcates_xhr.open("GET","/blog/fetch_certificates",true)
        certifcates_xhr.send()

        certifcates_xhr.onload = () => {
            const data = JSON.parse(certifcates_xhr.responseText)
            const message = data["message"]
            const status = data["status"].toLowerCase()

            if(status == "success"){
                resolve(message)
            }
            else{
                flash_response(message,status)
                resolve(null)
            }
        }
    })
}


// Populate Certificate Records Function
function populate_certificate_records(){

    const record_list = document.querySelector(".record_list")
    record_list.innerHTML = ""

    const certificate_items = document.querySelector(".certification_items")
    certificate_items.innerHTML = ""

    const records_promise = new Promise(async (resolve) => {
        const records = await fetch_all_certificates()
        if (records != null) {
            for (const record_id in records) {
                const record = records[record_id]
                const record_item = document.createElement("div")
                const certificate = document.createElement("div")
                const cert_delete = document.createElement("div")
                const cert_edit = document.createElement("div")

                record_item.classList.add("record_item")
                certificate.classList.add("certificate")
                cert_delete.classList.add("cert_delete")
                cert_edit.classList.add("cert_edit")

                certificate.innerText = `${record["name"]}(${record["id"]})`
                cert_delete.innerText = "DELETE"
                cert_edit.innerText = "EDIT"

                // Add Event Listener To delete
                cert_delete.addEventListener("click", () => {
                    const delete_form = new FormData()
                    delete_form.append('csrf_token', csrf_token.value)
                    delete_form.append("uid", record["uid"])

                    const delete_xhr = new XMLHttpRequest()
                    delete_xhr.open("DELETE", "/blog/delete_certificate", true)
                    delete_xhr.send(delete_form)
                    delete_xhr.onload = () => {
                        const data = JSON.parse(delete_xhr.responseText)
                        const message = data["message"]
                        const status = data["status"]

                        flash_response(message, status)
                        populate_certificate_records()
                    }
                })


                // Add Event Listener to Edit
                cert_edit.addEventListener("click", () => {
                    const cert_id = document.getElementById("Certificate_id")
                    const cert_issuer = document.getElementById("Certificate_issuer")
                    const cert_name = document.getElementById("Certificate_name")
                    const cert_image = document.getElementById("Certificate_image")
                    const file_container = document.getElementById("file_container")
                    const uploaded_file = document.getElementById("uploaded_file")
                    const save_btn = document.querySelector(".cert_save_btn")
                    const update_btn = document.querySelector(".update_certificate_btn")
                    const update_btn_container = document.querySelector(".cert_update_btn")

                    cert_image.classList.add("remove_display")
                    file_container.classList.remove("remove_display")
                    cert_image.value = ""
                    uploaded_file.value = record["image"]
                    cert_name.value = record["name"]
                    cert_issuer.value = record["issuer"]
                    cert_id.value = record["id"]

                    save_btn.classList.add("remove_display")
                    update_btn.setAttribute("id", record["uid"])
                    update_btn_container.classList.remove("remove_display")
                })

                
                // Display In Records
                record_item.appendChild(certificate)
                record_item.appendChild(cert_delete)
                record_item.appendChild(cert_edit)
                record_list.appendChild(record_item)


                // Display In Preview
                const certificate_item = document.createElement("div")
                const certificate_link = document.createElement("a")
                const certificate_name = document.createElement("div")
                const certificate_details = document.createElement("div")
                const certificate_issuer = document.createElement("div")
                const certificate_id = document.createElement("div")

                certificate_id.classList.add("certificate_id")
                certificate_issuer.classList.add("certificate_issuer")
                certificate_details.classList.add("certificate_details")
                certificate_name.classList.add("certificate_name")
                certificate_item.classList.add("certificate_item")
                certificate_link.setAttribute("href", `/blog/static/images/certificates/${record["image"]}`)
                
                certificate_id.innerText = `Certificate ID: ${record["id"]}`
                certificate_issuer.innerText = `${record["issuer"]},`
                certificate_name.innerText = record["name"]

                certificate_details.appendChild(certificate_issuer)
                certificate_details.appendChild(certificate_id)
                certificate_link.appendChild(certificate_name)
                certificate_link.appendChild(certificate_details)
                certificate_item.appendChild(certificate_link)
                certificate_items.appendChild(certificate_item)

            }
        }
        resolve()
    })
}


// Clear Certificate Form Function
function clear_certificate_form(){
    const certificate_id = document.getElementById("Certificate_id")
    const certificate_issuer = document.getElementById("Certificate_issuer")
    const certificate_name = document.getElementById("Certificate_name")
    const certificate_image = document.getElementById("Certificate_image")
    const file_container = document.getElementById("file_container")
    const uploaded_file = document.getElementById("uploaded_file")
    const save_btn = document.querySelector(".cert_save_btn")
    const update_btn = document.querySelector(".cert_update_btn")
    
    certificate_id.value = ""
    certificate_issuer.value = ""
    certificate_name.value = ""
    certificate_image.value = ""
    uploaded_file.value = ""

    file_container.classList.add("remove_display")
    certificate_image.classList.remove("remove_display")
    save_btn.classList.remove("remove_display")
    update_btn.classList.add("remove_display")
}


// Clear Certificate Form Button
const cert_clear_btn = document.getElementById("cert_clear_btn")
cert_clear_btn.addEventListener("click", (e) => {
    e.preventDefault()
    clear_certificate_form()
})


// Update Certificate Function
function update_certificate(){
    const certificate_uid = document.querySelector(".update_certificate_btn")
    const certificate_id = document.getElementById("Certificate_id")
    const certificate_issuer = document.getElementById("Certificate_issuer")
    const certificate_name = document.getElementById("Certificate_name")
    const certificate_image = document.getElementById("Certificate_image")
    const certificate_image_path = document.getElementById("uploaded_file")

    const certificate_form = new FormData()
    certificate_form.append("csrf_token", csrf_token.value)
    certificate_form.append("certificate_uid", certificate_uid.id)
    certificate_form.append("certificate_id", certificate_id.value)
    certificate_form.append("certificate_issuer", certificate_issuer.value)
    certificate_form.append("certificate_name", certificate_name.value)
    certificate_form.append("certificate_image", certificate_image.files[0])
    certificate_form.append("certificate_image_path", certificate_image_path.value)

    const cert_Promise = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("PUT","/blog/edit_certificate",true)
        xhr.send(certificate_form)
        xhr.onload = () =>{
            const data = JSON.parse(xhr.responseText)
            const message = data["message"]
            const status = data["status"].toLowerCase()
            
            flash_response(message,status)
            if(status != "success"){
                reject()
            }
            else{

                // Run clear certificate form
                clear_certificate_form()

                // Reload Displayed certificates
                populate_certificate_records()
            }
        }
    })
}


// Update Certificate Button
const update_certificate_btn = document.querySelector(".update_certificate_btn")
update_certificate_btn.addEventListener("click",(e) => {
    update_certificate()
})


// Save Certificate Function
function save_certificate(){
    const certificate_id = document.getElementById("Certificate_id")
    const certificate_issuer = document.getElementById("Certificate_issuer")
    const certificate_name = document.getElementById("Certificate_name")
    const certificate_image = document.getElementById("Certificate_image")

    const certificate_form = new FormData()
    certificate_form.append("csrf_token", csrf_token.value)
    certificate_form.append("certificate_id", certificate_id.value)
    certificate_form.append("certificate_issuer", certificate_issuer.value)
    certificate_form.append("certificate_name", certificate_name.value)
    certificate_form.append("certificate_image",certificate_image.files[0])


    const cert_Promise = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("POST","/blog/add_certificate",true)
        xhr.send(certificate_form)
        xhr.onload = () =>{
            const data = JSON.parse(xhr.responseText)
            const message = data["message"]
            const status = data["status"].toLowerCase()
            
            flash_response(message,status)
            if(status != "success"){
                reject()
            }
            else{

                // Run clear certificate form
                clear_certificate_form()

                // Reload Displayed certificates
                populate_certificate_records()
            }
        }
    })
}


// Save Certificate Button
const certificate_btn = document.getElementById("certificate_btn")
certificate_btn.addEventListener("click", (e) => {
    e.preventDefault()
    save_certificate()
})


// Add Event Listener For Upload Change
const container = document.getElementById("file_container")
container.addEventListener("click", () => {
    const certificate_image = document.getElementById("Certificate_image")
    certificate_image.click()

    certificate_image.onchange = (e) => {
        certificate_image.classList.remove("remove_display")
        container.classList.add("remove_display")
        container.children[0].value = ""
    }
})


// Run Populate Certificate Records
populate_certificate_records()


// Fetch Stack Function
function fetch_stack(){
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET","/blog/fetch_stack",true)
        xhr.send()
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            const message = data["message"]
            const status = data["status"].toLowerCase()

            if (status == "success"){
                resolve(message)
            }
            else{
                flash_response(message, message_status)
            }
        }
    })
}


// Save Stack Function
function save_stack(){
    const stack_icon = document.getElementById("Stack_icon")
    const stack_name = document.getElementById("Stack_name")

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("stack_name", stack_name.value)

    const file_length = stack_icon.files.length
    if (file_length > 0){
        form.append("stack_icon", stack_icon.files[0])
    }

    const xhr = new XMLHttpRequest()
    xhr.open("POST","/blog/add_stack",true)
    xhr.send(form)
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const message = data["message"]
        const status = data["status"]

        flash_response(message,status)
    }
}

// Save Stack Button
const save_stack_btn = document.querySelector(".stack_save_btn")
save_stack_btn.addEventListener("click", (e) => {
    e.preventDefault()
    save_stack()
    display_stack()
})


// Add To Stack Record Function
function add_to_stack_records(icon_stack, stack_elements){

    // Add To Stack Records
    const stack_element = document.createElement("div")
    const stack_name = document.createElement("div")
    const stack_delete = document.createElement("div")
    const stack_edit = document.createElement('div')

    stack_name.innerText = icon_stack["name"]
    stack_delete.innerText = "DELETE"
    stack_edit.innerText = "EDIT"

    stack_edit.classList.add("stack_edit")
    stack_delete.classList.add("stack_delete")
    stack_name.classList.add("stack_name")
    stack_element.classList.add("stack_element")

    // Add delete event listener
    stack_delete.addEventListener("click", () => {
        const delete_form = new FormData()
        delete_form.append('csrf_token', csrf_token.value)
        delete_form.append("id", icon_stack["id"])

        const delete_xhr = new XMLHttpRequest()
        delete_xhr.open("DELETE", "/blog/delete_stack", true)
        delete_xhr.send(delete_form)
        delete_xhr.onload = () => {
            const data = JSON.parse(delete_xhr.responseText)
            const message = data["message"]
            const status = data["status"]

            flash_response(message, status)
            display_stack()
        }
    })

    // Add edit event listener
    stack_edit.addEventListener("click", () => {
        console.log(icon_stack)

        const stack_icon = document.getElementById("Stack_icon")
        const stack_icon_container = document.getElementById("icon_container")
        const uploaded_icon = document.getElementById("uploaded_icon")
        const stack_name = document.getElementById("Stack_name")
        const save_btn_area = document.querySelector(".stack_save_btn_area")
        const edit_btn_area = document.querySelector(".stack_edit_btn_area")
        const stack_edit_btn = document.querySelector(".stack_edit_btn")

        stack_icon.value = ""
        stack_icon.classList.add("remove_display")
        stack_icon_container.classList.remove("remove_display")
        uploaded_icon.value = icon_stack["icon"]
        stack_name.value = icon_stack["name"]
        save_btn_area.classList.add("remove_display")
        edit_btn_area.classList.remove("remove_display")
        stack_edit_btn.id = icon_stack["id"]

    })
    
    stack_element.appendChild(stack_name)
    stack_element.appendChild(stack_delete)
    stack_element.appendChild(stack_edit)

    stack_elements.appendChild(stack_element)

}


// Add Event Listener For Upload Change
const stack_container = document.getElementById("icon_container")
stack_container.addEventListener("click", () => {
    const stack_icon = document.getElementById("Stack_icon")
    stack_icon.click()

    stack_icon.onchange = () => {
        stack_icon.classList.remove("remove_display")
        stack_container.classList.add("remove_display")
        stack_container.children[0].value = ""
    }
})


// Display Stack In Preview Function
function display_stack(){
    const stack_items = document.querySelector(".stack_items")
    stack_items.innerHTML = ""

    const stack_no_image_table = document.querySelector(".stack_no_image_table")
    stack_no_image_table.innerHTML = ""

    const stack_elements = document.querySelector(".stack_elements")
    stack_elements.innerHTML = ""

    const display_Promise = new Promise(async (resolve) => {
        const stack_data = await fetch_stack()
        
        if (stack_data != undefined && stack_data != null){
            const icon_data = stack_data["message"]["icon_skills"]
            const no_icon_data = stack_data["message"]["no_icon_skills"]
    
            if (icon_data != []){
    
                for (const icon_stack_index in icon_data){
                    const icon_stack = icon_data[icon_stack_index]

                    // Add To Icon Image Display
                    const stack_item = document.createElement("div")
                    const stack_image = document.createElement("div")
                    const img_element = document.createElement("img")
    
                    const stack_title = document.createElement("div")
                    const title_content = document.createElement("p")
    
                    title_content.innerText = icon_stack["name"]
                    stack_title.classList.add("stack_title")
                    img_element.setAttribute("src", `/blog/static/images/stack_icons/${icon_stack["icon"]}`)
                    stack_image.classList.add("stack_image")
                    stack_item.classList.add("stack_item")

                    stack_title.appendChild(title_content)
                    stack_image.appendChild(img_element)
                    stack_item.appendChild(stack_image)
                    stack_item.appendChild(stack_title)
    
                    stack_items.appendChild(stack_item)
                    add_to_stack_records(icon_stack, stack_elements)
                }

                const no_icon_count = no_icon_data.length
                for (let i=0; i<no_icon_count; i+=2){
                    const first_elem = no_icon_data[i]
                    const second_elem = no_icon_data[i+1]

                    // Add No Icon Table
                    const tr = document.createElement("tr")
                    const td_1 = document.createElement("td")
                    const td_2 = document.createElement("td")

                    td_1.innerText = first_elem["name"]
                    tr.appendChild(td_1)
                    add_to_stack_records(first_elem, stack_elements)

                    try {
                        td_2.innerText = second_elem["name"]                    
                        tr.appendChild(td_2)
                        add_to_stack_records(second_elem, stack_elements)

                    } 
                    catch (error) {
                        console.log(error)
                    }

                    stack_no_image_table.appendChild(tr)
                }
            }
        }

        resolve()
    })
}

// Run Display Stack
display_stack()


// Update Stack Function
function update_stack(){
    const btn = document.querySelector(".stack_edit_btn")
    const uploaded_icon = document.getElementById("uploaded_icon")
    const stack_icon = document.getElementById("Stack_icon")
    const stack_name = document.getElementById("Stack_name")

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("stack_id", btn.id)
    form.append("stack_name", stack_name.value)

    const file_length = stack_icon.files.length
    if (file_length > 0){
        form.append("stack_icon", stack_icon.files[0])
    }
    else if (uploaded_icon.value !== "") {
        form.append("uploaded_icon", true)
    }
    else{
        form.append("uploaded_icon", false)
    }

    const xhr = new XMLHttpRequest()
    xhr.open("PUT","/blog/update_stack",true)
    xhr.send(form)
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const message = data["message"]
        const status = data["status"]

        flash_response(message,status)
        display_stack()
    }
}


// Update Stack Button
document.querySelector(".stack_edit_btn").addEventListener("click",(e) => {
    e.preventDefault()
    update_stack()
})


// Clear Stack Form
function clear_stack_form(){
    const stack_icon = document.getElementById("Stack_icon")
    const icon_container = document.getElementById("icon_container")
    const uploaded_icon = document.getElementById("uploaded_icon")
    const stack_name = document.getElementById("Stack_name")
    const stack_save_btn_area = document.querySelector(".stack_save_btn_area")
    const stack_edit_btn_area = document.querySelector(".stack_edit_btn_area")

    stack_icon.value = ""
    uploaded_icon.value = ""
    stack_name.value = ""
    icon_container.classList.add("remove_display")
    stack_icon.classList.remove("remove_display")
    stack_edit_btn_area.classList.add("remove_display")
    stack_save_btn_area.classList.remove("remove_display")
}


// Clear Stack Form Button
document.querySelector(".stack_clear_btn").addEventListener("click",(e) => {
    e.preventDefault()
    clear_stack_form()
})


// Save Work Sample Function
function save_work_sample(){
    const project_name = document.getElementById("Project_name")
    const project_link = document.getElementById("Project_link")
    const project_summary = document.getElementById("Project_summary")
    const project_image = document.getElementById("Project_background_image")

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("project_name", project_name.value)
    form.append("project_link", project_link.value)
    form.append("project_summary", project_summary.value)
    form.append("project_image", project_image.files[0])

    new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "/blog/add_project",true)
        xhr.send(form)
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            const message = data["message"]
            const status = data["status"]

            flash_response(message,status)
        }
        resolve()
    })
}


// Save Work Sample Button
const project_save_btn = document.querySelector(".project_save_btn")
project_save_btn.addEventListener("click",(e) => {
    e.preventDefault()
    save_work_sample()
})


// Fetch Work Sample Function
function fetch_projects() {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest
        xhr.open("GET", "/blog/fetch_projects",true)
        xhr.send()
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            const status = data["status"].toLowerCase()

            if (status == "success"){
                resolve(data["message"])
            }
            else{
                const message = data["message"].toLowerCase()
                flash_response(message,status)
            }
        }
    })
}


// Display Work Samples Function
function display_work_samples(){
    const project_promise = new Promise(async (resolve,reject) => {
        const all_projects = await fetch_projects()

        const work_projects = document.querySelector(".work_projects")
        work_projects.innerHTML = ""

        const work_items = document.querySelector(".work_items")
        work_items.innerHTML = ""

        for(const project_index in all_projects){
            const project = all_projects[project_index]

            // Display Preview
            const work_project = document.createElement("div")
            const project_image = document.createElement("div")
            const img = document.createElement("img")
            const project_info = document.createElement("div")
            const project_title = document.createElement("div")
            const project_mini_description = document.createElement("div")
            const project_link = document.createElement("div")
            const link = document.createElement("a")

            link.setAttribute("href",project["project_link"])
            img.setAttribute("src",`/blog/static/images/project_images/${project["project_image"]}`)

            link.classList.add("link")
            project_link.classList.add("project_link")
            link.innerText = "View Project"
            project_link.appendChild(link)

            project_mini_description.classList.add("project_mini_description")
            project_mini_description.innerText = project["project_description"]

            project_title.classList.add("project_title")
            project_title.innerText = project["project_title"]

            project_info.classList.add("project_info")
            project_info.appendChild(project_title)
            project_info.appendChild(project_mini_description)
            project_info.appendChild(project_link)

            project_image.classList.add("project_image")
            project_image.appendChild(img)

            work_project.classList.add("work_project")
            work_project.appendChild(project_image)
            work_project.appendChild(project_info)
            work_projects.appendChild(work_project)

            // Add To Work Records
            const work_items = document.querySelector(".work_items")
            const work_item = document.createElement("div")
            const work_name = document.createElement("div")
            const work_delete = document.createElement("div")
            const work_edit = document.createElement("div")

            // Create Edit Button
            work_edit.classList.add("work_edit")
            work_edit.innerText = "EDIT"

            // Add Edit Event Listener
            work_edit.addEventListener("click",(e) => {
                e.preventDefault()

                const project_name = document.getElementById("Project_name")
                const project_summary = document.getElementById("Project_summary")
                const project_background_image = document.getElementById("Project_background_image")
                const project_link = document.getElementById("Project_link")
                const image_container = document.getElementById("image_container")
                const project_image = document.getElementById("project_image")
                const save_btn_area = document.querySelector(".project_save_btn_area")
                const edit_btn_area = document.querySelector(".project_edit_btn_area")
                const project_edit_btn = document.querySelector(".project_edit_btn")

                project_background_image.classList.add("remove_display")
                image_container.classList.remove("remove_display")
                save_btn_area.classList.add("remove_display")
                edit_btn_area.classList.remove("remove_display")

                project_name.value = project["project_title"]
                project_summary.value = project["project_description"]
                project_link.value = project["project_link"]
                project_image.value = project["project_image"]
                project_edit_btn.id = project["id"]
            })

            // Create Delete Button
            work_delete.classList.add("work_delete")
            work_delete.innerText = "DELETE"

            // Add Delete Event Listener
            work_delete.addEventListener("click",(e) => {
                e.preventDefault()

                const form = new FormData()
                form.append("csrf_token", csrf_token)
                form.append("project_id", project["id"])

                const xhr = new XMLHttpRequest()
                xhr.open("DELETE","/blog/delete_project",true)
                xhr.send(form)

                xhr.onload = () => {
                    const data = JSON.parse(xhr.responseText)
                    const message = data["message"]
                    const status = data["status"]

                    flash_response(message,status)
                    display_work_samples()
                }
            })

            work_name.classList.add("work_name")
            work_name.innerText = project["project_title"]

            work_item.classList.add("work_item")
            work_item.appendChild(work_name)
            work_item.appendChild(work_delete)
            work_item.appendChild(work_edit)
            work_items.appendChild(work_item)
        }
    })
}


// Display Projects
display_work_samples()


// Add Change Image Event
const image_container = document.getElementById("image_container")
image_container.addEventListener("click", () => {

    const project_background_image = document.getElementById("Project_background_image")
    project_background_image.click()
    
    project_background_image.onchange = () => {
        const project_image = document.getElementById("project_image")
        project_image.value = ""
        project_image.classList.add("remove_display")

        project_background_image.classList.remove("remove_display")
    }
})


// Clear Work Samples Form
const project_clear_btn = document.querySelector(".project_clear_btn")
project_clear_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const project_name = document.getElementById("Project_name")
    const project_summary = document.getElementById("Project_summary")
    const project_background_image = document.getElementById("Project_background_image")
    const project_link = document.getElementById("Project_link")
    const image_container = document.getElementById("image_container")
    const project_image = document.getElementById("project_image")
    const save_btn_area = document.querySelector(".project_save_btn_area")
    const edit_btn_area = document.querySelector(".project_edit_btn_area")

    project_background_image.classList.remove("remove_display")
    image_container.classList.add("remove_display")
    save_btn_area.classList.remove("remove_display")
    edit_btn_area.classList.add("remove_display")

    project_name.value = ""
    project_summary.value = ""
    project_link.value = ""
    project_image.value = ""
    project_background_image.value = ""
})


// Update Work Samples
const project_edit_btn = document.querySelector(".project_edit_btn")
project_edit_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const project_name = document.getElementById("Project_name")
    const project_summary = document.getElementById("Project_summary")
    const project_background_image = document.getElementById("Project_background_image")
    const project_link = document.getElementById("Project_link")
    const project_image = document.getElementById("project_image")

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("project_id", project_edit_btn.id)
    form.append("project_title", project_name.value)
    form.append("project_description", project_summary.value)
    form.append("project_link", project_link.value)
    
    if (project_background_image.classList.contains("remove_display")){
        form.append("project_image", project_image.value)
    }
    else{
        form.append("project_background_image", project_background_image.files[0])
    }

    const xhr = new XMLHttpRequest()
    xhr.open("PUT","/blog/update_project",true)
    xhr.send(form)
    xhr.onload = () =>{
        const data = JSON.parse(xhr.responseText)
        const message = data["message"]
        const status = data["status"]

        flash_response(message,status)
        display_work_samples()
    }

})