import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import faker from "faker";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Lượng truy cập Website",
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Khách mới",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top sản phẩm bán chạy",
    },
  },
};
export const data2 = {
  labels: ["Iphone", "Samsung", "Xiaomi", "Oppo", "Realme", "Asus"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export default function HomeAdmin() {
  return (
    <div className="bg-gray-100">
      <div className="m-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center py-10 pl-10">
              <svg
                height="50px"
                width="50"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    style={{ fill: "#32BEA6" }}
                    d="M469.328,512H42.672C19.2,512,0,492.8,0,469.328V42.672C0,19.2,19.2,0,42.672,0h426.656 C492.8,0,512,19.2,512,42.672v426.656C512,492.8,492.8,512,469.328,512z"
                  ></path>{" "}
                  <path
                    style={{ fill: "#FFFFFF" }}
                    d="M242.768,345.304v-79.192c-24.704-7.056-42.808-17.736-54.344-32.04 c-11.528-14.304-17.288-31.664-17.288-52.08c0-20.672,6.512-38.024,19.56-52.08c13.04-14.04,30.392-22.136,52.08-24.288V86.912 h27.408v18.712c20.032,2.392,35.976,9.232,47.816,20.512c11.832,11.28,19.4,26.368,22.68,45.264l-47.816,6.248 c-2.904-14.872-10.464-24.952-22.68-30.248v73.904c30.232,8.192,50.84,18.808,61.8,31.848c10.96,13.032,16.448,29.768,16.448,50.176 c0,22.808-6.896,42.032-20.704,57.656c-13.8,15.624-32.976,25.2-57.544,28.728v35.344h-27.408v-34.408 c-21.808-2.64-39.504-10.776-53.112-24.384c-13.608-13.6-22.312-32.816-26.088-57.64l49.336-5.296 c2.008,10.08,5.784,18.784,11.344,26.088C229.792,336.736,235.96,342.032,242.768,345.304z M242.768,146.84 c-7.44,2.52-13.368,6.8-17.768,12.856c-4.416,6.048-6.616,12.72-6.616,20.032c0,6.68,2.008,12.88,6.048,18.624 c4.032,5.736,10.144,10.368,18.336,13.896V146.84z M270.176,347.952c9.44-1.768,17.128-6.144,23.056-13.144 c5.92-6.984,8.888-15.216,8.888-24.672c0-8.44-2.496-15.712-7.464-21.832c-4.976-6.112-13.128-10.8-24.472-14.08v73.728H270.176z"
                  ></path>{" "}
                </g>
              </svg>
              <div className="pl-4">
                <p className="font-bold text-xl">714K</p>
                <p className="text-md text-gray-500 font-normal">Doanh số</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center py-10 pl-10">
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 91 91"
                enable-background="new 0 0 91 91"
                id="Layer_1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path
                      d="M71.619,16.685c-10.5,0-19.045,8.545-19.045,19.051c0,10.504,8.545,19.051,19.045,19.051 c10.508,0,19.055-8.547,19.055-19.051C90.674,25.229,82.127,16.685,71.619,16.685z M79.365,38.407h-5.438v5.439 c0,1.385-1.123,2.506-2.506,2.506s-2.504-1.121-2.504-2.506v-5.439h-5.439c-1.383,0-2.506-1.121-2.506-2.506 c0-1.383,1.123-2.504,2.506-2.504h5.439v-5.436c0-1.383,1.121-2.504,2.504-2.504s2.506,1.121,2.506,2.504v5.436h5.438 c1.383,0,2.504,1.121,2.504,2.504C81.869,37.286,80.748,38.407,79.365,38.407z"
                      fill="#6EC4A7"
                    ></path>{" "}
                    <g>
                      {" "}
                      <polygon
                        fill="#6EC4A7"
                        points="25.506,55.183 21.086,78.269 26.541,82.632 31.99,78.272 27.504,55.183 "
                      ></polygon>{" "}
                      <path
                        d="M43.961,47.731c-3.236,3.193-7.326,5.506-11.889,6.576l4.76,24.412c0.18,0.859-0.139,1.744-0.82,2.289 l-2.051,1.639c5.709-0.682,11.896-2.17,18.375-4.889V59.64C52.336,54.269,49.566,50.374,43.961,47.731z"
                        fill="#647F94"
                      ></path>{" "}
                      <path
                        d="M20.922,54.384c-4.67-1.041-8.855-3.381-12.152-6.635c-5.375,2.635-8.027,6.525-8.027,11.891v18.205 c2.584,1.201,9.234,3.908,18.488,4.896l-2.162-1.73c-0.682-0.547-1.002-1.428-0.826-2.283L20.922,54.384z"
                        fill="#647F94"
                      ></path>{" "}
                      <path
                        d="M26.35,50.341c11.309,0,20.506-9.262,20.506-20.648S37.658,9.044,26.35,9.044 c-11.299,0-20.492,9.262-20.492,20.648S15.051,50.341,26.35,50.341z"
                        fill="#647F94"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div className="pl-4">
                <p className="font-bold text-xl">21K</p>
                <p className="text-md text-gray-500 font-normal">
                  Người dùng mới
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center py-10 pl-10">
              <svg
                height="50px"
                width="50px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <polygon points="138.424,156 99.856,41.872 0,41.872 0,11.368 121.752,11.368 167.312,146.232 "></polygon>{" "}
                  <polygon
                    style={{ fill: "#FFD67F" }}
                    points="64.448,130.384 487.944,130.384 407.224,356.872 134.968,356.872 "
                  ></polygon>{" "}
                  <circle cx="359.704" cy="441.904" r="58.728"></circle>{" "}
                  <circle cx="182.576" cy="441.904" r="58.728"></circle>{" "}
                  <path
                    style={{ fill: "#FF583E" }}
                    d="M470.44,319.832H219.552c-22.856,0-41.56-18.704-41.56-41.56v-68.576 c0-22.856,18.704-41.56,41.56-41.56H470.44c22.856,0,41.56,18.704,41.56,41.56v68.576C512,301.128,493.296,319.832,470.44,319.832z"
                  ></path>{" "}
                  <g>
                    {" "}
                    <path
                      style={{ fill: "#FFFFFF" }}
                      d="M239.688,219.072l4.144,21.24c1.056,5.408,2.12,11.152,2.976,17.096h0.208 c1.064-5.944,2.552-11.888,3.824-16.992l5.528-21.344h12.744l5.208,20.704c1.376,5.84,2.76,11.688,3.824,17.632h0.208 c0.752-5.944,1.816-11.784,2.984-17.736l4.456-20.6h15.816L285.68,271h-15.184l-4.888-18.264 c-1.272-5.096-2.224-9.768-3.288-16.136h-0.24c-0.952,6.464-2.008,11.256-3.392,16.136L253.48,271h-15.184l-15.08-51.928 L239.688,219.072L239.688,219.072z"
                    ></path>{" "}
                    <path
                      style={{ fill: "#FFFFFF" }}
                      d="M322.288,219.072l4.144,21.24c1.056,5.408,2.12,11.152,2.976,17.096h0.208 c1.064-5.944,2.552-11.888,3.824-16.992l5.528-21.344h12.744l5.208,20.704c1.376,5.84,2.76,11.688,3.824,17.632h0.208 c0.752-5.944,1.816-11.784,2.984-17.736l4.456-20.6h15.816L368.28,271h-15.184l-4.888-18.264 c-1.272-5.096-2.224-9.768-3.288-16.136h-0.216c-0.952,6.464-2.008,11.256-3.392,16.136L336.104,271H320.92l-15.08-51.928 L322.288,219.072L322.288,219.072z"
                    ></path>{" "}
                    <path
                      style={{ fill: "#FFFFFF" }}
                      d="M404.896,219.072l4.144,21.24c1.056,5.408,2.12,11.152,2.976,17.096h0.208 c1.064-5.944,2.552-11.888,3.824-16.992l5.528-21.344h12.744l5.208,20.704c1.376,5.84,2.76,11.688,3.824,17.632h0.208 c0.752-5.944,1.816-11.784,2.984-17.736l4.456-20.6h15.816L450.888,271h-15.184l-4.888-18.264 c-1.272-5.096-2.224-9.768-3.288-16.136h-0.216c-0.952,6.464-2.008,11.256-3.392,16.136L418.712,271h-15.184l-15.08-51.928 L404.896,219.072L404.896,219.072z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div className="pl-4">
                <p className="font-bold text-xl">714K</p>
                <p className="text-md text-gray-500 font-normal">
                  Đơn đặt hàng
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center py-10 pl-10">
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g style={{ stroke: "#333333", strokeWidth: 2 }}>
                    {" "}
                    <path
                      style={{ fill: "#C4C48B" }}
                      d="m 3,16 94,0 0,68 -94,0 z"
                    ></path>{" "}
                    <path
                      style={{ fill: "#EAEAAB" }}
                      d="m 4,16 34,33 c 7,7 15,7 23,0 L 96,16 z"
                    ></path>{" "}
                    <path
                      style={{ fill: "none" }}
                      d="M 96,84 59,51 M 4,84 40,51"
                    ></path>{" "}
                  </g>{" "}
                  <g transform="scale(0.6), translate(56,56)">
                    {" "}
                    <path
                      style={{
                        fill: "#FF8500",
                        stroke: "#825B0A",
                        strokeWidth: 4,
                      }}
                      d="M 98,43 74,66 79,99 49,84 19,99 25,66 1,42 34,37 49,7 64,37 z"
                    ></path>{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <mask id="mask_circle">
                      {" "}
                      <circle cx="50" cy="50" r="50" fill="white"></circle>{" "}
                      <circle cx="50" cy="50" r="12" fill="#000000"></circle>{" "}
                    </mask>{" "}
                    <linearGradient
                      x1="20"
                      y1="60"
                      x2="60"
                      y2="40"
                      id="Gradient"
                      gradientUnits="userSpaceOnUse"
                    >
                      {" "}
                      <stop
                        style={{ stopColor: "#C07F00", stopOpacity: 1 }}
                        offset="0"
                      ></stop>{" "}
                      <stop
                        style={{ stopColor: "#FFB85B", stopOpacity: 1 }}
                        offset="1"
                      ></stop>{" "}
                    </linearGradient>{" "}
                  </defs>{" "}
                  <g transform="scale(0.6), translate(26,56)">
                    {" "}
                    <path
                      style={{
                        fill: "none",
                        stroke: "#DC9B1D",
                        strokeWidth: 3,
                      }}
                      d="M 96,81 61,12 C 57,2.7 43,2.7 39,12 39,12 5.4,78 3.4,83 c -2,5 0,12 8.6,12 l 71,0 c 12,0 17,-5 13,-14 z"
                    ></path>{" "}
                    <path
                      style={{
                        fill: "url(#Gradient)",
                        stroke: "#444444",
                        strokeWidth: 7,
                      }}
                      d="M 91,80 58,16 C 54,7.1 46,7.1 42,16 42,16 11,77 9,81 6.2,86 5.8,91 14,91 l 67,0 c 12,0 14,-3 10,-11 z"
                    ></path>{" "}
                    <path
                      style={{ fill: "#333333" }}
                      d="M 46,63 43,35 57,35 54,63 z"
                    ></path>{" "}
                    <circle
                      cx="50"
                      cy="73"
                      r="7"
                      style={{ fill: "#333333" }}
                    ></circle>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div className="pl-4">
                <p className="font-bold text-xl">714K</p>
                <p className="text-md text-gray-500 font-normal">
                  Báo cáo lỗi
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            {" "}
            <Line options={options} data={data} />
          </div>
          <div>
            <Pie options={options2} data={data2} />
          </div>
        </div>
      </div>
    </div>
  );
}
