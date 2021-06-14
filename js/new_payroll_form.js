window.addEventListener('DOMContentLoaded', (event) => {
    const name=document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent="";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent="";
        }catch (e) {
            textError.textContent=e;
        } 
    });   

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
    output.textContent = salary.value; 
    }); 

    const date = document.querySelector('#date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input', function () {
        const startDate = getInputValueById('#day')+" "+
                          getInputValueById('#month')+" "+
                          getInputValueById('#year');
        try {
            checkStartDate(new Date(Date.parse(startDate)));
            dateError.textContent="";
        }catch (e) {
            dateError.textContent=e;
        }
    });
});

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
    try {
        employeePayrollData.name=getInputValueById('#name');
    } catch(e) {
        setTextValue('.text-error', e);
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

const  getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems= [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

/**
 * 1: querrySelector is the newer feature.
 * 2: The querySelector method can be used when selecting by element name,
 *    nesting, or class name.
 * 3: quereySelector lets you find elements with rules that cant be
 *    expressed with getElementByID.
 */
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

/**
 * 1: getElemtByID is better supported than quereySelector in older versions
 *    of the Browser
 * 2: The thing with getElementByID is that, it only allows to select an
 *    element by its ID
 */

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate > now) throw 'Start Date is Future Date!';
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