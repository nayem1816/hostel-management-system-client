import { useState } from "react";
import { roomData } from "../../data/room-data.js";
import Room from "@/Components/room";

export default function Rooms() {
  const [branchValue, setBranchValue] = useState<string>();
  const [selectedRoom, setSelectedRoom] = useState();
  console.log(selectedRoom);

  if (selectedRoom) {
    const { roomId } = selectedRoom;
  }

  return (
    <div className="flex items-center flex-col">
      <div className="roomSubmit my-4 mb-8">
        <label htmlFor="branch">Choose a branch: </label>
        <select
          id="branch"
          name="branch"
          value={branchValue}
          onChange={(e) => {
            setBranchValue(e.target.value);
          }}
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          <option value="mirpur-2">Mirpur 2</option>
          <option value="dhanmondi">Dhanmondi</option>
        </select>
      </div>
      <div className="roomContent">
        <div className="rooms">
          {roomData.map((branch) => {
            if (branch.branch === branchValue) {
              return (
                <div>
                  <h1 className="text-center text-3xl">
                    Rooms and Seats in {branchValue}
                  </h1>
                  <div className="flex w-full">
                    {branch.rooms.map((room) => {
                      return <Room data={{ room, setSelectedRoom }} />;
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
