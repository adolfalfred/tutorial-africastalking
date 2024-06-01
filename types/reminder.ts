export default interface ReminderProps {
  _id: string;
  title: string;
  description: string;
  time: string;
  day: string;
  repeats: string;
  type: string[];
  createdAt: Date;
  updatedAt: Date;
}
