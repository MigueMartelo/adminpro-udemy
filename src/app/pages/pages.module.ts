import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Pipes
import { PipesModule } from '../pipes/pipes.module';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
	declarations: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graficas1Component,
		IncrementadorComponent,
		GraficoDonaComponent,
		AccountSettingsComponent,
		PromesasComponent,
		RxjsComponent,
		ProfileComponent,
		UsuariosComponent
	],
	exports: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graficas1Component
	],
	imports: [
		SharedModule,
		FormsModule,
		ChartsModule,
		PAGES_ROUTES,
		PipesModule,
		CommonModule
	]
})

export class PagesModule {}
