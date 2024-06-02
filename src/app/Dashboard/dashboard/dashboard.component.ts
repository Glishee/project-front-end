import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScorePointService } from '../../Services/scorePoint.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalGamesPlayed: number = 0;
  totalPointsEarned: number = 0;
  totalHoursPlayed: number = 0;
  averageGameDuration: number = 0;
  percentGamesCompleted: number = 0;

  constructor(private scorePointService: ScorePointService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const games = await this.scorePointService.list();
      console.log('Fetched games:', games); // Логирование данных
      this.totalGamesPlayed = games.length;
      this.totalPointsEarned = games.reduce((acc, game) => {
        const points = parseFloat(game.scorePoint);
        return acc + (isNaN(points) ? 0 : points);
      }, 0);

      // Вычисление общего времени игры
      const totalMinutesPlayed = games.reduce((acc, game) => {
        const duration = parseFloat(game.duration); // Предполагается, что длительность хранится в минутах как строка
        return acc + (isNaN(duration) ? 0 : duration);
      }, 0);
      this.totalHoursPlayed = totalMinutesPlayed / 60;

      // Вычисление средней продолжительности игры
      if (games.length > 0) {
        this.averageGameDuration = totalMinutesPlayed / games.length;
      }

      // Вычисление процента завершенных игр
      const completedGames = games.filter(game => !game.isTimedOut).length;
      if (games.length > 0) {
        this.percentGamesCompleted = (completedGames / games.length) * 100;
      }

      // Логирование вычисленных значений
      console.log('Total Games Played:', this.totalGamesPlayed);
      console.log('Total Points Earned:', this.totalPointsEarned);
      console.log('Total Hours Played:', this.totalHoursPlayed);
      console.log('Average Game Duration:', this.averageGameDuration);
      console.log('Percent Games Completed:', this.percentGamesCompleted);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}