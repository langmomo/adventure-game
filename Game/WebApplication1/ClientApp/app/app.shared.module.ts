import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { GameSnakeComponent } from './components/gamesnake/gamesnake.component';
import { MainGameComponent } from './components/maingame/maingame.component';
import { BattleComponent } from './components/battle/battle.component';
import { ShopComponent } from './components/shop/shop.component';
@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
		HomeComponent,
		GameSnakeComponent,
		MainGameComponent,
		BattleComponent,
		ShopComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
			{ path: 'fetch-data', component: FetchDataComponent },
			{ path: 'gamesnake', component: GameSnakeComponent },
			{ path: 'maingame', component: MainGameComponent },
			{ path: 'battle', component: BattleComponent },
			{ path: 'shop', component: ShopComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
