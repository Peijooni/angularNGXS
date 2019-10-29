import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Practise } from '../models/Practise';
import { AddPractise, DeletePractise, InitPractises, UpdatePractise, LogIn, LogOut } from '../actions/practise.action';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

export interface PractiseStateModel {
    practises: Practise[];
    access_token: string;
}

@State<PractiseStateModel>({
    name: 'practises',
    defaults: {
        practises: [],
        access_token: null
    }
})
export class PractiseState {

    APIEndpoint: any;
    constructor(private store: Store, private _router: Router){
        this.APIEndpoint = environment.APIEndpoint;
    }

    @Selector()
    static getPractises(state: PractiseStateModel) {
        return state.practises;
    }

    async getTokenFromStore(): Promise<any> {
        let res: string;

        await this.store.select(state => state.practises.access_token)
        .pipe(take(1))
        .toPromise()
        .then(data => res = data)
        .catch(err => console.error(err));
        return res;
    }

    async getHttpGETData(): Promise<any> {
        let res: any;
        try {
            await this.getTokenFromStore().then(data => {
                if(data !== null) {
                    res = axios.get(this.APIEndpoint+'/practises?token='+data);                
                } else {
                    // We should never go here
                    console.log("Not logged in");
                    this.store.dispatch(new LogOut());
                    this._router.navigate(['/login']);       
                }            
            })
            .catch(err => console.error(err));
        }
        catch(err) {
            console.error(err);
        }
        return res;
    }

    async postHttpPOSTData(practise: object): Promise<any> {
        let res: any;
        try {
            await this.getTokenFromStore().then(data => {
                if(data !== null) {
                    res = axios.post(this.APIEndpoint+'/practises?token='+data, practise);                
                } else {
                    // We should never go here
                    console.log("Not logged in");
                    this.store.dispatch(new LogOut());
                    this._router.navigate(['/login']);       
                }            
            })
            .catch(err => console.error(err));
        }
        catch(err) {
            console.error(err);
        }
        return res;
    }

    async deleteHttpDELETEData(id: number): Promise<any> {
        let res: any;
        try {
            await this.getTokenFromStore().then(data => {
                if(data !== null) {
                    res = axios.delete(this.APIEndpoint+'/practises/' + id +'?token='+data);                
                } else {
                    // We should never go here
                    console.log("Not logged in");
                    this.store.dispatch(new LogOut());
                    this._router.navigate(['/login']);       
                }            
            })
            .catch(err => console.error(err));
        }
        catch(err) {
            console.error(err);
        }
        return res;
    }

    async updateHttpPUTData(id: number, practise: object): Promise<any> {
        let res: any;
        try {
            await this.getTokenFromStore().then(data => {
                if(data !== null) {
                    res = axios.put(this.APIEndpoint+'/practises/' + id +'?token='+data, practise);                
                } else {
                    // We should never go here
                    console.log("Not logged in");
                    this.store.dispatch(new LogOut());
                    this._router.navigate(['/login']);       
                }            
            })
            .catch(err => console.error(err));
        }
        catch(err) {
            console.error(err);
        }
        return res;
    }

    @Action(InitPractises)
    initializeStoreFromREST({patchState}: StateContext<PractiseStateModel>) {
        this.getHttpGETData().then((data: any) => {
            if(Array.isArray(data.data) && data.data.length) {
                patchState({
                    practises: [ ...data.data ]
                });       
            } else {
                console.log("Got no practises from REST server");
            }     
            }).catch(err => err.code === 404 
                ? throwError("Not found")
                : throwError(err)
                );
    }

    @Action(AddPractise)
    add({getState, patchState}: StateContext<PractiseStateModel>, action: AddPractise) {
        let practise = action.payload;
        this.postHttpPOSTData(practise).then((info: any) => {  
            if(info.data.id === undefined) {                    
                console.error("got from REST", info.data);
                throw new Error("no ID returned");
            }
            practise.id = info.data.id;
            const state = getState();
            let newPractises = [...state.practises, practise];
            newPractises.sort(function(a: Practise, b: Practise){
                if(a.date > b.date) {
                    return -1;
                }
                if(a.date < b.date) {
                    return 1;
                }
                return 0;
            });
            patchState({
                practises: [ ...newPractises ]
            });
        
        })
        .catch(err => err.code === 404 
            ? throwError("Not found")
            : throwError(err));
    }    

    @Action(DeletePractise)
    deletePractise({getState, patchState}: StateContext<PractiseStateModel>, {id}: DeletePractise) {
        this.deleteHttpDELETEData(id).then((info: any) => {
            if(info.data.id === undefined) {                  
                console.error("got from REST", info.data);
                throw new Error("no ID returned");
            }
            const state = getState();
            const filteredArray = state.practises.filter(item => item.id !== id); 
            patchState({
                practises: [ ...filteredArray ]
            });                  
        })
        .catch(err => err.code === 404 
            ? throwError("Not found")
            : throwError(err));
    }

    
    @Action(UpdatePractise)
    updatePractise({getState, patchState}: StateContext<PractiseStateModel>, action: UpdatePractise) {
        const practise = action.payload;
        const id = practise.id;
        this.updateHttpPUTData(id, practise).then((info: any) => {                
            if(info.data.id === undefined) {                    
                console.error("got from REST", info.data);
                throw new Error("no ID returned");
            }
            const state = getState();
            state.practises.forEach((item) => { 
                if (item.id === id) {
                    item = practise;
                }                  
            });
            patchState({
                practises: [ ...state.practises ]
            });
        
        })
        .catch(err => err.code === 404 
            ? throwError("Not found")
            : throwError(err));
    }

    @Action(LogIn)
    logIn({patchState}: StateContext<PractiseStateModel>, action: any) {
        patchState({
            access_token:  action.payload
        });   
    }

    @Action(LogOut)
    logOut({patchState}: StateContext<PractiseStateModel>) {
        patchState({
            access_token: null
        });   
    }
}