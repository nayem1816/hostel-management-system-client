/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Inputs = {
  // example: string;
  // exampleRequired: string;
  displayName: string;
  profession: string;
  gender: string;
  address: string;
  emergency_number: string;
};

const MainProfile = (props: any) => {
  const { data } = props;
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(data?.image);
  const [blogData, setBlogData] = useState([]);
  const [startDate, setStartDate] = useState(data?.birthDate);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
  };

  const imageFileDrop = async (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    const field = "thumbnail";
    const value = file.secure_url;
    const newBlogData: any = { ...blogData };
    newBlogData[field] = value;
    setBlogData(newBlogData);

    setImage(file.secure_url);
    // setImage(files[0])
    setImageLoading(false);
  };

  const uploadImage = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    const field = e.target.name;
    const value = file.secure_url;
    setImage(file.secure_url);
    setImageLoading(false);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // const  handleSubmit = () => {
  //   console.log("working");
  // };
  return (
    <div>
      <div className="container mx-auto my-20 py-20">
        <div
          style={{
            boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
            backgroundColor: "#36393e",
          }}
          className="my-5 rounded px-4 py-4 text-center"
        >
          <h4 className="text-3xl font-bold">
            Make Your Profile Look Batter by Filling the Form
          </h4>
        </div>
        <div style={{}}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
              backgroundColor: "#36393e",
            }}
            className="my-5 rounded bg-slate-200 dark:bg-darkBlue p-6 text-Dark dark:text-white"
          >
            <div className="grid grid-cols-12 gap-3">
              {/* Profile picture  */}
              <div className="col-span-12 flex justify-center md:col-span-6">
                <div
                  className="mx-auto flex self-center overflow-hidden rounded-full border-2 border-white sm:mx-0"
                  style={{ height: "150px", width: "150px" }}
                >
                  <img
                    style={{ height: "150px", width: "150px" }}
                    className="mx-auto rounded-full border-2 border-white object-cover"
                    src="https://icon-library.com/images/person-png-icon/person-png-icon-29.jpg"
                    alt=""
                  />
                </div>
              </div>
              {/* Profile Photo Update Handling  */}
              <div className="col-span-12 flex flex-col md:col-span-6">
                <div className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
                  <label>
                    <div
                      // className="mt-12 text-center"
                      onDragOver={dragOver}
                      onDragEnter={dragEnter}
                      onDragLeave={dragLeave}
                      onDrop={imageFileDrop}
                    >
                      <div className="">
                        {imageLoading && (
                          <div>
                            <img
                              className="mx-auto animate-ping"
                              style={{ height: "50px", width: "50px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-xl text-gray-400">Loading ...</p>
                          </div>
                        )}
                        {!imageLoading && (
                          <div>
                            <img
                              className="mx-auto animate-pulse"
                              style={{ height: "50px", width: "50px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-md text-gray-400">
                              Drag & Drop your profile photo
                            </p>
                          </div>
                        )}
                        <p className="py-4">
                          <span className="rounded-lg bg-gray-400 px-2 py-2 font-semibold  text-Docy-Dark dark:text-white">
                            Browse File
                          </span>
                        </p>
                      </div>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      name="thumbnail"
                      placeholder="upload"
                      onChange={uploadImage}
                    />
                  </label>
                </div>
                {/* <small className=" text-red-600 ">Required*</small> */}
                {/* <FormHelperText sx={{ color: "red" }}>Required*</FormHelperText> */}
                {/* <div>
                  <div className="pt-4">
                    <div>
                      {image && (
                        <img
                          className="mx-auto"
                          style={{ maxWidth: "100%" }}
                          src={image}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 py-2">
              <div className="col-span-12 flex flex-col  md:col-span-6">
                <label htmlFor="displayName">Name</label>
                <input
                  // onBlur={blogTitle}
                  // defaultValue={data?.displayName}
                  required
                  placeholder="Name"
                  className="h-14 w-full rounded-md border-2 p-3 text-lg"
                  type="text"
                  {...register("displayName")}
                />
              </div>
              <div className="col-span-12 flex flex-col  md:col-span-6">
                <label htmlFor="title">Date of Birth</label>
                <DatePicker
                  className="h-14 w-full rounded-md border-2 p-3 text-lg"
                  selected={startDate}
                  onChange={(date, Date) => {
                    setStartDate(date);
                  }}
                />
              </div>
              <div className="col-span-12 flex flex-col  md:col-span-6">
                <label htmlFor="profession">Profession</label>
                <input
                  className="rounded-md border p-2 text-lg"
                  type="text"
                  {...register("profession")}
                  // defaultValue={data?.profession}
                />
              </div>
              <div className="col-span-12 flex flex-col  md:col-span-6">
                <label htmlFor="gender">Gender</label>
                <input
                  className="rounded-md border p-2 text-lg"
                  type="text"
                  {...register("gender")}
                  // defaultValue={data?.gender}
                />
              </div>
              <div className="col-span-12 flex flex-col  md:col-span-6">
                <label htmlFor="address">Address</label>
                <input
                  className="rounded-md border p-2 text-lg"
                  type="text"
                  {...register("address")}
                  // defaultValue={data?.address}
                />
              </div>
              <div className="col-span-12 flex flex-col  md:col-span-6">
                <label htmlFor="emergency_number">Emergency Number</label>
                <input
                  className="rounded-md border p-2 text-lg"
                  type="text"
                  {...register("emergency_number")}
                  // defaultValue={data?.website}
                />
              </div>
            </div>
            <span className="">
              <input
                type="submit"
                className=" mt-5 rounded-lg bg-indigo-500 px-6 py-3 text-lg font-semibold text-white"
                value="Save changes"
              />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
