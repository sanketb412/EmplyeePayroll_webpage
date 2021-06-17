let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector("#name");
    // const textError = document.querySelector('.text-error');
    name.addEventListener("input", function() {
        if(name.value.length == 0) {
            // textError.textContent = " ";
            setTextValue('.text-error', "");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            // textError.textContent = "";
            setTextValue('.text-error', "");
        } catch(e) {
            // textError.textContent = e;
            setTextValue('.text-error', e);
        }
    });

    const date = document.querySelector('#date');
    // const dateError = document.querySelector(".date-error");
    date.addEventListener('input', function() {
        let startDate = getInputValueById('#day')+ " " +getInputValueById('#month')+ " " +getInputValueById('#year');
        try {
            // checkStartDate(new Date(Date.parse(startDate)));
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.date-error', "");
        } catch (e) {
            setTextValue('.date-error', e);
        }
    });

    const salary = document.querySelector("#salary");
    // const output = document.querySelector(".salary-output");
    // output.textContent = salary.value;
    setTextValue('.salary-output', salary.value);
    salary.addEventListener("input", function() {
        // output.textContent = salary.value;
        setTextValue('.salary-output', salary.value);
    });

    checkForUpdate();
});

const checkStartDate = (startDate) => {
    let now = new Date();
    if(startDate > now) {
        throw "StartDate is Future Date!";
    }
}

// const save = () => {
//     try {
//         let employeePayrollData = createEmployeePayroll();
//         createAndUpdateStorage(employeePayrollData);
//     } catch(e) {
//         return;
//     }
// }

const save = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}

const setEmployeePayrollObject =() => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('name=department]').pop();
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+ " " + getInputValueById('#month') +" "+ getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById("#name");
    } catch(e) {
        setTextValue(".text-error",e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    let date = getInputValueById('#day')+ " " + getInputValueById('#month') +" "+ getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj._id); 
        if (!empPayrollData) {
        employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index = employeePayrollList
                          .map(empData => empData._id)
                          .indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(employeePayrollData._id));
            } 
    } else {
        employeePayrollList = [createEmployeePayrollData()]
    }    
localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData; 
}

const setEmployeePayrollDat = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch(e) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj_.profilePic;
    employeePayrollData.gender = employeePayrollObj_.gender;
    employeePayrollData.department = employeePayrollObj_.department;
    employeePayrollData.salary = employeePayrollObj_.salary;
    employeePayrollData.note = employeePayrollObj_.note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch(e) {
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID =!empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}
/*
 * 1: querySelector is the newer feature.
 * 2: The querySelector method can be used when selecting by element name, nesting, or class name.
 * 3: querySelector lets you foind elements with rules that can't be expressed with getElementById
 */
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

/*
 * 1: getElementById is better supported than querySelector in older versions of the browsers.
 * 2: The thing with getElementById is that iot only allows to select an element by its id.
 *
const getInputValueById = (id) => {
    let value = document.getElementById(id).value;
    return value;
}
*/

const getSelectedValues = (propertyValue) => {
    let allItems =document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems =document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if(value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
        item.checked = true;
    });
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setvalue('#year','2018');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    }); 
}

const setTextValue = () => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}