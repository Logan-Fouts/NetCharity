function initializeRegistration(){
    document.getElementById('register-organization').addEventListener('change', (event) => {
        this.toggleOrganizationInfo(event.target.checked);
    });
}

function toggleOrganizationInfo(checked){
    document.getElementById('organization-info').style.display = checked ? 'block' : 'none';
}