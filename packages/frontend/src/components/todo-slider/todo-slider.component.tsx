import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { sliderStyles } from './todo-slider.styles';
import TodoActions from '~components/todo-actions/todo-actions.component';
import { completionIcons, privacyIcons } from '~shared/styles/icons';
import { useTodoStore } from '~store/todo.store';
import { useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from '~shared/keys';

const TodoSlider = () => {
	const { todos, totalPages } = useTodoStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get('page')) || 1;

	const swiperRef = useRef(null);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setSearchParams({ page: `${currentPage + 1}` });
		}
	};

	useEffect(() => {
		const savedIndex = sessionStorage.getItem(STORAGE_KEYS.SLIDER_INDEX);
		if (savedIndex && swiperRef.current) {
			swiperRef.current.swiper.slideTo(parseInt(savedIndex), 0, false);
		}
	}, []);

	const handleSlideChange = (swiper) => {
		const activeIndex = swiper.activeIndex;
		sessionStorage.setItem(STORAGE_KEYS.SLIDER_INDEX, activeIndex);
	};

	return (
		<>
			<div className={sliderStyles}>
				<Swiper
					navigation={true}
					modules={[Navigation]}
					className="mySwiper"
					onReachEnd={nextPage}
					onSlideChange={handleSlideChange}
					ref={swiperRef}
				>
					{todos.map((todo, index) => (
						<SwiperSlide key={todo.id}>
							<div className="todo-content">
								<div className="title-container">
									{
										completionIcons[
											todo?.completed.toString()
										]
									}
									<span className="title">{todo?.title}</span>
									{privacyIcons[todo?.private.toString()]}
								</div>
								<p className="description">
									{todo?.description}
								</p>
								<TodoActions todo={todo} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default TodoSlider;
