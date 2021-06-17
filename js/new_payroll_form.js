
window.addEventListener('DOMContentLoaded', (event) => {
    const name=document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent="";
            return;
        }
        try {
            (new EmployeePayrollData())._name = name.value;
            textError.textContent="";
        }catch (e) {
            textError.textContent=e;
        }
    });

    const date = document.querySelector('#date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input', function () {
        let startDate = getInputValueById('#day')+" "+
                          getInputValueById('#month')+" "+
                          getInputValueById('#year');
        try {
             checkStartDate(new Date(Date.parse(startDate)));
           // (new EmployeePayrollData()).startDate = new date(Date.parse(startDate));
            dateError.textContent=" ";
        }catch (e) {
            dateError.textContent=e;
        }
    });

   
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value; 
    }); 

    // checkForUpdate();
});

const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate > now) throw 'Start Date is Future Date!';
}

const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    // employeePayrollData._id = new Date().getTime();
    try{
        employeePayrollData.name=getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') +" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList=[employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

// const  getSelectedValues = (propertyValue) => {
//     let allItems = document.querySelectorAll(propertyValue);
//     let selItems= [];
//     allItems.forEach(item => {
//         if(item.checked) selItems.push(item.value);
//     });
//     return selItems;
// }

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

// *
//  * 1: getElementById is better supported than querySelector in older versions of the browsers.
//  * 2: The thing with getElementById is that iot only allows to select an element by its id.
//  *

// const getInputElementValue = (id) => {
//     let value = document.getElementById(id).value;
//     return value;
// }

const  getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems= [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

// function createAndUpdateStorage(employeePayrollData){
//     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

//     if(employeePayrollList != undefined){
//         employeePayrollList.push(employeePayrollData);
//     }else{
//         employeePayrollList=[employeePayrollData]
//     }
//     alert(employeePayrollList.toString());
//     localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
// }

const resetForm = () => {
    setValue("#name", '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value ) => {
    const element = document.querySelector(id);
    element.value = value;
}