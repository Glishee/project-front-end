import { Routes } from '@angular/router';
import { FormCComponent } from './form-c/form-c.component';
import { CategoryListComponent } from './category-list/category-list.component'
import { PlayGameComponent } from './play-game/play-game.component';
import { GameComponent } from './game/game.component';
import { ChooseGameDialogComponent } from './choose-game-dialog/choose-game-dialog.component'
import { MatchingGameComponent } from './matching-game/matching-game.component'
import { MixedWordsComponent } from './mixed-words/mixed-words.component'

export const routes: Routes = [
	{path: 'category/:id', component: FormCComponent},
	{path: 'newcategory', component: FormCComponent},
	{path: 'admin', component: PlayGameComponent},
	{path: 'game/:category', component: GameComponent},
	{path: 'dialog', component: ChooseGameDialogComponent},
	{path: 'mixed-words/:id', component: MixedWordsComponent},
	{path: '', component: CategoryListComponent},
	{path:'matching-game', component: MatchingGameComponent}
];
