import { CustomWebComponent } from '../custom-webcomp';

export type typeScore = {
  catch: number;
  flee: number;
  timeLeft?: number;
  points?: number;
};

export class HighScores extends CustomWebComponent {
  constructor(private highScores: typeScore[]) {
    super('high-scores');
  }

  protected postConstruct(): void {
    this.highScores.map(score => {
      score.timeLeft = score.timeLeft || 0;
      score.points = score.catch - score.flee + score.timeLeft;
    });
    this.highScores.sort((a, b) => b.points! - a.points!);
    const tbody = this.getElementsByTagName('tbody')[0]!;
    this.highScores.map(score => {
      const td1 = document.createElement('td');
      td1.textContent = '' + score.points;
      const td2 = document.createElement('td');
      td2.textContent = '' + score.catch;
      const td3 = document.createElement('td');
      td3.textContent = '' + score.flee;
      const td4 = document.createElement('td');
      td4.textContent = '' + score.timeLeft;
      const tr = document.createElement('tr');
      tr.append(td1, td2, td3, td4);
      tbody.appendChild(tr);
    });
  }
}
