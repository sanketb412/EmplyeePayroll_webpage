window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`
    let empPayrollList = creteEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" 
                    src="${empPayrollData._profilePic}" alt=""></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img name="${empPayrollData._id}" onclick="remove(this)" 
                    src="../assest/icons/delete-black-18dp.svg" alt="delete">
                <img name="${empPayrollData._id}"  onclick="update(this)"
                    src="../assest/icons/create-black-18dp.svg" alt="edit">
            </td>    
        </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const creteEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Sanket Bagde',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '5000000',
            _startDate: '29 Oct 2020',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assest/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Vicky Bagde',
            _gender: 'male',
            _department: [
                'HR',
                'Finance'
            ],
            _salary: '3000000',
            _startDate: '4 Nov 2020',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assest/profile-images/Ellipse -5.png'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for ( const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}