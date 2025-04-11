import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/schedules/";
export async function createSchedule(
  day: number = 1,
  scheduleType: number,
  description: string,
  openingTime: string,
  closingTime: string,
  isOpen: number = 0
) {
  const response = await post(`${endpoint}create`, {
    day: day,
    scheduleType: scheduleType,
    description: description,
    openTime: openingTime,
    closeTime: closingTime,
    isOpen: isOpen,
  });

  return response;
}

export async function getAllSchedules() {
  const response = await get(`${endpoint}all`);
  return response;
}
export async function getAllSchedulesByType(scheduleType: number = 0) {
  const response = await get(`${endpoint}allByTypes?scheduleType=${scheduleType}`);
  return response;
}

export async function editSchedule(
  id: number,
  day: number = 1,
  scheduleType: number,
  description: string,
  openTime: string,
  closeTime: string,
  isOpen: number = 0
) {
  return await patch(`${endpoint}update/${id}`, {
    day: day,
    scheduleType: scheduleType,
    description: description,
    openingTime: openTime,
    closingTime: closeTime,
    isOpen: isOpen,
  });
}

export async function deleteSchedule(id: string) {
 
  const response = await del(`${endpoint}delete/${id}`);
  return response;
}
