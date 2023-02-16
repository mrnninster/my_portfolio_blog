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


const save_btn = document.querySelector(".save_settings")
save_btn.addEventListener("click",(e) => {
    e.preventDefault()

    const upload_resume = document.getElementById("upload_resume")
    const resume_image = document.getElementById("resume_image")
    const twitter_link = document.getElementById("twitter_link")
    const linkedin_link = document.getElementById("linkedin_link")
    const github_link = document.getElementById("github_link")
    const email = document.getElementById("email")

    const form = new FormData()
    form.append("csrf_token", csrf_token.value)
    form.append("upload_resume", upload_resume.files[0])
    form.append("resume_image", resume_image.files[0])
    form.append("twitter_link", twitter_link.value)
    form.append("linkedin_link", linkedin_link.value)
    form.append("github_link", github_link.value)
    form.append("email", email.value)

    const xhr = new XMLHttpRequest()
    xhr.open("PUT","/blog/save_settings",true)
    xhr.send(form)
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const message = data["message"]
        const status = data["status"]

        flash_response(message, status)
    }
})