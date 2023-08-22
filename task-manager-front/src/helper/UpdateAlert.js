import Swal from "sweetalert2";
import {UpdateTaskRequest} from "../APIServices/CRUDServices";
import {SuccessToast} from "./ValidationHelper";

export function TaskUpdateAlert(id, status) {


    Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {
            New: 'New',
            Completed: 'Completed',
            Progress: 'Progress',
            Cancelled: 'Cancelled'
        },
        //inputPlaceholder: 'Select a Task',
        inputValue: status,
        confirmButtonText: 'Update',
        showCancelButton: true,
        inputValidator: ((value) => {

            if (!value) {
                return 'Please Select Task'
            } else if (value == status) {
                return 'Select another Status'
            } else {

                UpdateTaskRequest(id,status,value);
            }


        })


    })

}