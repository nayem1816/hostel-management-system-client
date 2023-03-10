import Link from "next/link";

export default function Room(props: any) {
  const room = props.data.room;
  return (
    <div className=" card " id={room.roomId}>
      <img src={room.roomImage} className="max-h-sm" />
      <h1>Attached bathroom: {room.bathroom}</h1>
      <h1>Attached balcony: {room.balcony}</h1>
      <h1>Floor: {room.floor}</h1>
      <h1>Rent per week: {room.rent} Tk</h1>

      <div>
        <button
          className="bg-slate-500 rounded p-1 mt-4 m-1"
          onClick={() => {
            props.data.setSelectedRoom(room);
          }}
        >
          Select room
        </button>
        <button className="bg-slate-500 rounded p-1 mt-4 m-1">
          <Link href={`/rooms/${room.roomId}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
}
