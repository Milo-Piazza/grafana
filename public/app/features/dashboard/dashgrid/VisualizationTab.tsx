import React, { PureComponent } from 'react';

import { EditorTabBody } from './EditorTabBody';
import { VizTypePicker } from './VizTypePicker';

import { PanelModel } from '../panel_model';
import { DashboardModel } from '../dashboard_model';
import { PanelPlugin } from 'app/types/plugins';

interface Props {
  panel: PanelModel;
  dashboard: DashboardModel;
  plugin: PanelPlugin;
  onTypeChanged: (newType: PanelPlugin) => void;
}

export class VisualizationTab extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  getPanelDefaultOptions() {
    const { panel, plugin } = this.props;

    if (plugin.exports.PanelDefaults) {
      return panel.getOptions(plugin.exports.PanelDefaults.options);
    }

    return panel.getOptions(plugin.exports.PanelDefaults);
  }

  renderPanelOptions() {
    const { plugin } = this.props;
    const { PanelOptions } = plugin.exports;

    if (PanelOptions) {
      return <PanelOptions options={this.getPanelDefaultOptions()} onChange={this.onPanelOptionsChanged} />;
    } else {
      return <p>Visualization has no options</p>;
    }
  }

  onPanelOptionsChanged = (options: any) => {
    this.props.panel.updateOptions(options);
    this.forceUpdate();
  };

  render() {
    const { plugin } = this.props;

    const panelSelection = {
      title: plugin.name,
      imgSrc: plugin.info.logos.small,
      render: () => {
        // the needs to be scoped inside this closure
        const { plugin, onTypeChanged } = this.props;
        return <VizTypePicker current={plugin} onTypeChanged={onTypeChanged} />;
      },
    };

    return (
      <EditorTabBody main={panelSelection} toolbarItems={[]}>
        {this.renderPanelOptions()}
      </EditorTabBody>
    );
  }
}
