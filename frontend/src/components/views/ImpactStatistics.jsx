import { useState, useEffect, useRef } from "react";
import { MousePointerClick, Fingerprint, Flame } from "lucide-react";
import PropTypes from "prop-types";

// Custom hook for count-up animation
const useCountUp = (end, duration = 2000, start = 0) => {
	const [count, setCount] = useState(start);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (!isAnimating) return;

		let startTime;
		const animateCount = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = (timestamp - startTime) / duration;

			if (progress < 1) {
				setCount(Math.floor(progress * (end - start) + start));
				requestAnimationFrame(animateCount);
			} else {
				setCount(end);
			}
		};

		requestAnimationFrame(animateCount);
	}, [end, duration, start, isAnimating]);

	return [count, setIsAnimating];
};

// Custom hook for intersection observer
const useIntersectionObserver = (callback) => {
	const elementRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						callback();
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, [callback]);

	return elementRef;
};

const StatCard = ({
	icon: Icon,
	topValue,
	topLabel,
	bottomValue,
	bottomLabel,
	onVisible,
}) => {
	const [topCount, setTopAnimating] = useCountUp(parseInt(topValue), 2000);
	const [bottomCount, setBottomAnimating] = useCountUp(
		parseInt(bottomValue),
		2000
	);

	const ref = useIntersectionObserver(() => {
		setTopAnimating(true);
		setBottomAnimating(true);
		if (onVisible) onVisible();
	});

	return (
		<div
			ref={ref}
			className="rounded-2xl bg-[#1A1A1A] border-2 border-[#D84418] p-6 transform transition-all duration-300 hover:scale-105 hover:border-opacity-80 hover:shadow-[0_0_15px_rgba(216,68,24,0.3)]">
			<Icon className="w-10 h-10 text-[#D84418] mb-6" />
			<div className="space-y-6">
				<div>
					<div className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-[#D84418] to-[#FF6B6B] bg-clip-text text-transparent">
						{topCount}%
					</div>
					<div className="text-gray-400 font-medium">{topLabel}</div>
				</div>
				<div>
					<div className="text-4xl font-bold text-white mb-3">
						{bottomValue.startsWith("$") ? "$" : ""}
						{bottomCount}
						{bottomValue.endsWith("K")
							? "K"
							: bottomValue.endsWith("M")
							? "M"
							: ""}
					</div>
					<div className="text-gray-400 font-medium">
						{bottomLabel}
					</div>
				</div>
			</div>
		</div>
	);
};

const ImpactStatistics = () => {
	return (
		<div className="w-full bg-transparent py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto space-y-8 mb-16">
				<div className="text-[#D84418] uppercase tracking-wider font-semibold">
					Our Impact in Berlin
				</div>
				<h2 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl leading-tight bg-gradient-to-r from-[#D84418] to-[#FF6B6B] bg-clip-text text-transparent">
					Delivering Happiness to Over 100,000 Food Lovers Across
					Berlin
				</h2>
				<p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
					From local favorites to international cuisine, we&apos;re
					connecting Berlin&apos;s best restaurants with hungry
					customers. Our growing network of restaurants and delivery
					partners ensures quick, reliable delivery every time.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<StatCard
					icon={MousePointerClick}
					topValue="98"
					topLabel="Customer Satisfaction Rate"
					bottomValue="30"
					bottomLabel="Minutes Average Delivery Time"
				/>
				<StatCard
					icon={Fingerprint}
					topValue="85"
					topLabel="Partner Restaurants in Berlin"
					bottomValue="500K"
					bottomLabel="Monthly Active Users"
				/>
				<StatCard
					icon={Flame}
					topValue="92"
					topLabel="On-Time Delivery Rate"
					bottomValue="2M"
					bottomLabel="Successful Deliveries"
				/>
			</div>
		</div>
	);
};

StatCard.propTypes = {
	icon: PropTypes.elementType.isRequired,
	topValue: PropTypes.string.isRequired,
	topLabel: PropTypes.string.isRequired,
	bottomValue: PropTypes.string.isRequired,
	bottomLabel: PropTypes.string.isRequired,
	onVisible: PropTypes.func,
};

export default ImpactStatistics;
