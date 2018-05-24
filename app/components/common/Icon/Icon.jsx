import * as React from 'react';
import classNames from 'classnames';

type Props = {
    icon: string,
    style?: 'Brands' | 'Solid' | 'Light' | 'Regular',
    size?: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x'
};

export class Icon extends React.Component<Props> {
    props: Props;

    getStyles = function(style){
        switch(style) {
            case 'Brands': return 'fab';
            case 'Light': return 'fal';
            case 'Regular': return 'far';
            default: return 'fas';
        }
    }

    render() {
        const style = this.getStyles(this.props.style);
        const icon = `fa-${this.props.icon}`;
        const size = this.props.size ? `fa-${this.props.size}` : '';

        return (
            <i className={classNames(style, icon, size, this.props.className)}></i>
        );
    }
}
