import { fetchRoom } from "../RoomsPage/roomService";
import { fetchDepartments } from "../DepartmentPage/departmentService";

const BASE_URL = "http://localhost:9921/rooms/department";

export const addRoomDepartment = async (roomId, departmentId) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: { roomId }, 
        department: { departmentId } 
      }),
    });

    if (!response.ok) {
      const errorData = await parseErrorResponse(response);
      throw new Error(errorData.message || "Failed to assign room to department");
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error in addRoomDepartment:", error.message);
    throw error;
  }
};

export const deleteRoomDepartment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await parseErrorResponse(response);
      throw new Error(errorData.message || "Failed to delete room assignment");
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error in deleteRoomDepartment:", error.message);
    throw error;
  }
};

export const updateRoomDepartment = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await parseErrorResponse(response);
      throw new Error(errorData.message || "Failed to update room assignment");
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error in updateRoomDepartment:", error.message);
    throw error;
  }
};

export const fetchRoomDepartment = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`);

    if (!response.ok) {
      const errorData = await parseErrorResponse(response);
      throw new Error(errorData.message || "Failed to fetch room department assignments");
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error in fetchRoomDepartment:", error.message);
    throw error;
  }
};

// Helper function to parse JSON responses
const parseResponse = async (response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : {}; // Return an empty object if the response body is empty
};

// Helper function to parse error responses
const parseErrorResponse = async (response) => {
  try {
    return await response.json();
  } catch {
    return { message: "Server returned an invalid response." };
  }
};
