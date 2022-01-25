export class SkillPutDto {
  name: string = '';
  description: string = '';
  timeExperience: number = 0;
  level: string = '';
  portfolio?: string | null = null;
}
