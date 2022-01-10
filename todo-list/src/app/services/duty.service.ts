import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { getEndpoint } from '../../config/config.service'
import { Duty } from '../interfaces/duty';
import http from '../api/clienthttp';

@Injectable({
    providedIn: 'root'
}) 

export class DutyService {

    constructor() { }

    getDuty(): Promise<AxiosResponse<Duty[]>> {
        var searchUri: string = getEndpoint('getdutys');
        return http.get(searchUri);
    }

    deleteDuty(id: number | undefined) {
        var searchUri: string = getEndpoint('deleteduty').replace("{id}", id != null ? id.toString() : '');
        return http.delete(searchUri);
    }

    createDuty(duty: Duty) {
        var searchUri: string = getEndpoint('createduty');
        return http.post(searchUri, duty);
    }

    updateDuty(duty: Duty) {
        var searchUri: string = getEndpoint('updateduty').replace("{id}", duty.id != null ? duty.id.toString() : '');
        return http.put(searchUri, duty);
    }
}