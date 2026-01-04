import { useState, type ComponentProps } from "react";



const WishImg = ({ ...props }: ComponentProps<'img'>) => {

    const [imgError, setImgError] = useState(false);

    return (
        <>
            {props.src && !imgError ?
                <img
                    {...props}
                    className="object-cover h-full w-full rounded-2xl"
                    onError={() => setImgError(true)}
                />
                :
                <div className="text-gray-400">No image</div>
            }
        </>
    );
};

export default WishImg;