import { Component, OnInit } from '@angular/core';
import { DutyService } from '../services/duty.service';
import { Duty } from '../interfaces/duty';


@Component({
    selector: 'app-duty-list',
    templateUrl: './duty-list.component.html',
    styleUrls: ['./duty-list.component.css']
})

export class DutyListComponent {

    todos: Duty[];
    dutyService: DutyService;

    constructor(dutyService: DutyService) {
        this.dutyService = dutyService;
        this.todos = [];
        dutyService.getDuty().then(res => { this.todos = res.data; });
    }

    ngOnInit(): void {
    }

    onSubmit(name: string) {
        const duty: Duty = { name: name, completed: false };
        this.dutyService.createDuty(duty);
    }

    deleteDuty(index: number | undefined) {
        this.dutyService.deleteDuty(index);
    }

    createDuty(name: string) {
        const duty: Duty = { name: name, completed: false };
        this.dutyService.createDuty(duty);
    }

    updateDuty(duty: Duty, checked: boolean) {
        duty.completed = checked;
        this.dutyService.updateDuty(duty);
    }
}
