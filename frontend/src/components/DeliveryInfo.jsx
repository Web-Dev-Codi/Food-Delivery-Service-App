import { FaClock, FaTruck, FaUtensils } from "react-icons/fa";

const DeliveryInfo = () => {
	return (
		<div className="bg-transparent">
			<div className="w-full px-4">
				<div className="flex justify-start items-start flex-row gap-4">
					<div className="flex-1 md:flex-none flex flex-col gap-2 text-sm items-center justify-start md:justify-start md:flex-row space-x-3">
						<FaClock className="text-[#FF4D00] text-2xl flex-shrink-0" />
						<div className="flex-1">
							<p className="text-white text-sm">Delivery</p>
							<p className="text-white font-semibold">
								in less than 30 minutes
							</p>
						</div>
					</div>
					<div className="flex-1 md:flex-none flex flex-col gap-2 text-sm items-center justify-start md:justify-start space-x-3 md:flex-row">
						<FaTruck className="text-[#FF4D00] text-2xl flex-shrink-0" />
						<div className="flex-1">
							<p className="text-white text-sm">Free delivery</p>
							<p className="text-white font-semibold">
								from 30 €
							</p>
						</div>
					</div>
					<div className="flex-1 flex md:flex-none flex-col gap-2 text-sm items-center justify-start md:justify-start space-x-3 md:flex-row">
						<FaUtensils className="text-[#FF4D00] text-2xl flex-shrink-0" />
						<div className="flex-1">
							<p className="text-white text-sm">
								Only the freshest
							</p>
							<p className="text-white font-semibold">
								Foods delivered
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeliveryInfo;
