import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoryNewCard = ({ imageUrl, title, text, link, disabled }) => {
  return (
    <a
      href={disabled ? "#" : link}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      rel="noopener noreferrer"
      className={`group relative block h-[380px] w-full overflow-hidden rounded-[2rem] shadow-xl transition-all duration-500 ease-out isolate transform-gpu ${
        disabled ? "opacity-85 cursor-not-allowed" : "cursor-pointer hover:shadow-2xl hover:-translate-y-2"
      }`}
      style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 bg-gray-950 -z-10 bg-black">
        <LazyLoadImage
          src={process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl}
          alt={title}
          className="w-full h-full object-cover transform-gpu transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-50"
          effect="blur"
          placeholderSrc={"UNIVERSAL_PLACEHOLDER"}
          wrapperClassName="w-full h-full"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/100 group-hover:via-black/70" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-center pointer-events-none">
        <div className="transform-gpu transition-all duration-500 ease-out translate-y-10 group-hover:-translate-y-0">
          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wider relative inline-block mb-4">
            {title}
            {/* Animated Underline */}
            {!disabled && (
              <span className="absolute -bottom-2 left-1/2 w-0 h-[3px] bg-accent transition-all duration-700 ease-out -translate-x-1/2 group-hover:w-3/4 rounded-full" />
            )}
          </h3>

          {/* Description */}
          <div className="relative">
            <p className="text-white/90 font-medium leading-relaxed text-sm md:text-base line-clamp-3 drop-shadow-md mx-auto max-w-[280px] transform-gpu transition-all duration-500 ease-out opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
              {text}
            </p>
          </div>
        </div>
      </div>

      {/* Thin elegant border glow effect on hover */}
      <div className="absolute inset-0 border-[1.5px] border-white/0 rounded-[2rem] transition-colors duration-500 pointer-events-none group-hover:border-white/20" />

      {/* Disabled / Coming Soon Badge */}
      {disabled && (
        <div className="absolute inset-x-0 top-[45%] -translate-y-1/2 flex justify-center z-20 pointer-events-none">
          <div className="relative">
            {/* Glow behind badge */}
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            {/* Badge itself */}
            <span className="relative bg-black/40 backdrop-blur-md border border-white/30 text-white font-bold py-3 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] uppercase tracking-[0.2em] text-sm text-center flex items-center justify-center">
              Coming Soon
            </span>
          </div>
        </div>
      )}
    </a>
  );
};

export default CategoryNewCard;
